import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting, UpdateSettingDto, ApiResponse } from '@use-navi-date/shared';
import { Setting as SettingEntity } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingEntity)
    private settingsRepository: Repository<SettingEntity>,
  ) {}

  async create(userId: string): Promise<ApiResponse<Setting>> {
    try {
      const setting = this.settingsRepository.create({
        userId,
        notificationPreference: 'all',
        themePreference: 'light',
        emailNotification: true,
        pushNotification: true,
        privacySettings: {
          showProfile: true,
          showStatus: true,
          showLastSeen: true,
        },
      });
      
      const savedSetting = await this.settingsRepository.save(setting);
      
      return {
        success: true,
        data: savedSetting,
        message: '설정이 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '설정 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Setting[]>> {
    try {
      const settings = await this.settingsRepository.find({
        relations: ['user'],
      });
      return {
        success: true,
        data: settings,
        message: '설정 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '설정 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: string): Promise<ApiResponse<Setting>> {
    try {
      const setting = await this.settingsRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!setting) {
        return {
          success: false,
          message: '설정을 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: setting,
        message: '설정을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '설정 조회에 실패했습니다.',
      };
    }
  }

  async update(id: string, updateSettingDto: UpdateSettingDto): Promise<ApiResponse<Setting>> {
    try {
      const setting = await this.settingsRepository.findOne({ where: { id } });
      if (!setting) {
        return {
          success: false,
          message: '설정을 찾을 수 없습니다.',
        };
      }

      // privacySettings 업데이트 시 기존 설정과 병합
      if (updateSettingDto.privacySettings) {
        setting.privacySettings = {
          showProfile: updateSettingDto.privacySettings.showProfile ?? setting.privacySettings?.showProfile ?? true,
          showStatus: updateSettingDto.privacySettings.showStatus ?? setting.privacySettings?.showStatus ?? true,
          showLastSeen: updateSettingDto.privacySettings.showLastSeen ?? setting.privacySettings?.showLastSeen ?? true,
        };
      }

      // 다른 필드들 업데이트
      Object.assign(setting, updateSettingDto);
      const updatedSetting = await this.settingsRepository.save(setting);
      
      return {
        success: true,
        data: updatedSetting,
        message: '설정이 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '설정 업데이트에 실패했습니다.',
      };
    }
  }

  async remove(id: string): Promise<ApiResponse<void>> {
    try {
      const setting = await this.settingsRepository.findOne({ where: { id } });
      if (!setting) {
        return {
          success: false,
          message: '설정을 찾을 수 없습니다.',
        };
      }

      await this.settingsRepository.remove(setting);
      
      return {
        success: true,
        message: '설정이 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '설정 삭제에 실패했습니다.',
      };
    }
  }
} 