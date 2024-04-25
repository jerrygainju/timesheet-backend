// import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
// import { UserService } from './user.service';
// import { SignupInput } from './dto/sighnup-dto';
// import { SigninInput } from './dto/signin-dto';
// import { User } from './entities/user.entity';
// import { ResetPasswordResponse } from './dto/resetToken-dto';

// @Resolver('User')
// export class UserResolver {
//   constructor(private readonly userService: UserService) {}

//   @Mutation(() => User)
//   async signUp(@Args('input') signUpInput: SignupInput): Promise<User> {
//     return this.userService.signUp(signUpInput);
//   }

//   @Mutation(() => String)
//   async signIn(@Args('input') signInInput: SigninInput): Promise<{ token: string }> {
//     return this.userService.signIn(signInInput);
//   }
  
//   @Mutation(() => String)
//   async requestTokenPassword(@Args('email') email: string): Promise<string> {
//     const result = await this.userService.resetTokenPassword(email);
//     return result.token;
//   }

//   @Mutation(() => ResetPasswordResponse)
//   async resetPassword(
//     @Context() ctx: { req: Request },
//     @Args('newPassword') newPassword: string,
//     @Args('confirmPassword') confirmPassword: string,
//   ): Promise<ResetPasswordResponse> {
//     const resetToken = ctx.req.headers['resettoken'];
//     const token = await this.userService.resetPassword(resetToken, newPassword, confirmPassword);
//     return token
//   }
// }
