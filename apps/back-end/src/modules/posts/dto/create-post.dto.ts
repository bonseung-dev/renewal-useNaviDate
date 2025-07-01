import { IsString, IsNotEmpty, IsDate, IsEnum, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsEnum(['happy', 'sad', 'excited', 'angry', 'usual'])
  emotion: 'happy' | 'sad' | 'excited' | 'angry' | 'usual';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  coupleId?: string;
} 