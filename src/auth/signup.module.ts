import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Signup } from '../auth/entities/signup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupResolver } from './sighnup.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Signup])],
    providers: [SignupService, SignupResolver],
  })
export class SignupModule {}