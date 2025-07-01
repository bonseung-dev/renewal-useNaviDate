import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCoupleDto {
  @IsString()
  @IsNotEmpty()
  user2Id: string;
} 