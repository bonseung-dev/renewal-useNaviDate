import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

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
