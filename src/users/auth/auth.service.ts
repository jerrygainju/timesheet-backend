import { Injectable, HttpException, HttpStatus, Headers } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { SigninInput } from '../dto/signin-dto';
import { SignupInput } from '../dto/sighnup-dto';
import { validateEmail, validatePassword, validatePasswordMatch, validateSignInInput } from 'src/validations/singup-validation.helper';
import * as jwt from 'jsonwebtoken';
import ErrorMessage from 'src/common/error-message';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetPasswordResponse } from '../dto/resetToken-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      }
      
   async signUp(signUpInput: SignupInput): Promise<User> {
    try {
      const { username, email, password, confirmPassword } = signUpInput;

      if (!(username && email && password)) {
        throw new HttpException(ErrorMessage.FILL_ALL_DATA, HttpStatus.BAD_REQUEST);
      }

      if (password !== confirmPassword) {
        throw new HttpException(ErrorMessage.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
      }

      if (!validateEmail(email)) {
        throw new HttpException(ErrorMessage.INVALID_EMAIL, HttpStatus.BAD_REQUEST);
      }

      const existingEmail = await this.userRepository.findOne({ where: { email } });
      if (existingEmail) {
        throw new HttpException(ErrorMessage.EMAIL_EXISTS, HttpStatus.BAD_REQUEST);
      }

      if (!validatePassword(password)) {
        throw new HttpException(ErrorMessage.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
      }
      
      const encryptPassword = await bcrypt.hash(password, 10);
      const user = {
        username: username,
        email: email.toLowerCase(),
        password: encryptPassword,
      };
      
      const newUser = new User();
      newUser.username = username;
      newUser.email = email.toLowerCase();
      newUser.password = encryptPassword;
      
      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);

      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(signInInput: SigninInput): Promise<{ token: string }> {
  try {
    const { email, password } = signInInput;
    validateSignInInput(email, password);
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
         ErrorMessage.EMAIL_NOT_FOUND ,
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException(
        ErrorMessage.PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );
    }
    
    const secretKey = process.env.SECRET_KEY || 'default_secret_key';
    const token = jwt.sign({ userId: user.id, email }, secretKey); 
    return  token 
    
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    console.error(error);

    throw new HttpException(
      { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  async resetTokenPassword(email: string): Promise<{email: string, token:string}> {
    try {
      if(!email){
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: ErrorMessage.FILL_ALL_DATA },
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: ErrorMessage.EMAIL_NOT_FOUND },
          HttpStatus.BAD_REQUEST,
        );
      }
      
      const resetToken = jwt.sign({ userId: user.id }, process.env.SECRECT_KEY || 'default_secret_key', { expiresIn: '1h' });
      
      user.resetToken = resetToken;
      await this.userRepository.save(user);
    
      return {email, token: resetToken };
    } catch (error) {
      console.error('Error in resetTokenPassword:', error);
    
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error', error },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    
  }


async resetPassword(@Headers('resettoken') resetToken: string, newPassword: string, confirmPassword: string): Promise<ResetPasswordResponse> {
  try {
    if (!resetToken) {
      throw new HttpException(
        ErrorMessage.INVALID_RESET_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }
    if(newPassword !== confirmPassword)
      {
      throw new HttpException(ErrorMessage.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
    }
    if (!validatePassword(newPassword)) {
      throw new HttpException(ErrorMessage.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    const decodedToken: any = jwt.verify(resetToken, process.env.SECRECT_KEY || 'default_secret_key' );
    const user = await this.userRepository.findOne({ where: { id: decodedToken.userId } });
    if (!user) {
      throw new HttpException(ErrorMessage.INVALID_RESET_TOKEN, HttpStatus.BAD_REQUEST);
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    await this.userRepository.save(user);
    const showUser = {
      newPassword:user.password,
      token:user.resetToken
    }
    return showUser
  } catch (error) {
    console.error(error); 
    if (error instanceof HttpException) {
       throw error;
    } else {
       throw new HttpException(
         { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error', error },
         HttpStatus.INTERNAL_SERVER_ERROR,
       );
    }
   }
  }
}
