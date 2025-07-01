import { IsOptional, IsString, IsBoolean, IsObject } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  notificationPreference?: string;

  @IsOptional()
  @IsString()
  themePreference?: string;

  @IsOptional()
  @IsBoolean()
  emailNotification?: boolean;

  @IsOptional()
  @IsBoolean()
  pushNotification?: boolean;

  @IsOptional()
  @IsObject()
  privacySettings?: {
    showProfile?: boolean;
    showStatus?: boolean;
    showLastSeen?: boolean;
  };
} 