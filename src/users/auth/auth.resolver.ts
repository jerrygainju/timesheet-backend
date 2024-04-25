import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignupInput } from '../dto/sighnup-dto';
import { SigninInput } from '../dto/signin-dto';
import { User } from '../entities/user.entity';
import { ResetPasswordResponse } from '../dto/resetToken-dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';


@Resolver('User')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signUp(@Args('input') signUpInput: SignupInput): Promise<User> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => String)
  @UseGuards(LocalAuthGuard)
  async signIn(@Args('input') signInInput: SigninInput): Promise<{ token: string }> {
    const token = await this.authService.signIn(signInInput);
  return token ;
  }
  
  @Mutation(() => String)
  async requestTokenPassword(@Args('email') email: string): Promise<string> {
    const result = await this.authService.resetTokenPassword(email);
    return result.token;
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Context() ctx: { req: Request },
    @Args('newPassword') newPassword: string,
    @Args('confirmPassword') confirmPassword: string,
  ): Promise<ResetPasswordResponse> {
    const resetToken = ctx.req.headers['resettoken'];
    const token = await this.authService.resetPassword(resetToken, newPassword, confirmPassword);
    return token
  }
}
