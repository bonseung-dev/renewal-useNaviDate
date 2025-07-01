import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsString()
  @MinLength(2)
  nickname: string;

  @IsString()
  @IsOptional()
  profile_image?: string;
} 