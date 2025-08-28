import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiResponse, Tag } from '@use-navi-date/shared';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateTagsDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  names: string[];
}

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}

export { ApiResponse, Tag };
