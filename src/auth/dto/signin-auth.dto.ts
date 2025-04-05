// src/auth/dto/signin-auth.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
