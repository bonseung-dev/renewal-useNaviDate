import { IsString, IsDate, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnniversaryDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_annual?: boolean;
} 