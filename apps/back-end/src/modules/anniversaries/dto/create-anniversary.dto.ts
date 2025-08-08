import { IsString, IsDate, IsOptional, IsBoolean, MaxLength, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { RepeatOption } from '@use-navi-date/shared';

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

  @IsEnum(['NONE', 'YEARLY'])
  @IsOptional()
  repeat?: RepeatOption;

  @IsString()
  @IsOptional()
  memo?: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
} 