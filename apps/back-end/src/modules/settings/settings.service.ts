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

  private convertToSharedType(entity: SettingEntity): Setting {
    return {
      id: entity.id,
      userId: entity.userId,
      theme: entity.theme,
      allowPush: entity.allowPush,
      createdAt: entity.createdAt,
    };
  }

  async create(userId: string): Promise<ApiResponse<Setting>> {
    try {
      const setting = this.settingsRepository.create({
        userId,
        theme: 'light',
        allowPush: true,
      });
      
      const savedSetting = await this.settingsRepository.save(setting);
      
      return {
        success: true,
        data: this.convertToSharedType(savedSetting),
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
        data: settings.map(this.convertToSharedType),
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

  async findOne(userId: string): Promise<ApiResponse<Setting>> {
    try {
      const setting = await this.settingsRepository.findOne({
        where: { userId },
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
        data: this.convertToSharedType(setting),
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

  async update(userId: string, updateSettingDto: UpdateSettingDto): Promise<ApiResponse<Setting>> {
    try {
      const setting = await this.settingsRepository.findOne({ where: { userId } });
      if (!setting) {
        return {
          success: false,
          message: '설정을 찾을 수 없습니다.',
        };
      }

      // 업데이트할 필드들만 적용
      if (updateSettingDto.themePreference) {
        setting.theme = updateSettingDto.themePreference as 'light' | 'dark';
      }
      if (updateSettingDto.pushNotification !== undefined) {
        setting.allowPush = updateSettingDto.pushNotification;
      }

      const updatedSetting = await this.settingsRepository.save(setting);
      
      return {
        success: true,
        data: this.convertToSharedType(updatedSetting),
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