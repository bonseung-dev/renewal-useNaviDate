import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, CreateNotificationDto, ApiResponse } from '@use-navi-date/shared';
import { Notification as NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationsRepository: Repository<NotificationEntity>,
  ) {}

  private convertToSharedType(entity: NotificationEntity): Notification {
    return {
      id: entity.id,
      userId: entity.userId,
      type: entity.type,
      message: entity.message,
      isRead: entity.isRead,
      createdAt: entity.createdAt,
    };
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<ApiResponse<Notification>> {
    try {
      const notification = this.notificationsRepository.create({
        userId: createNotificationDto.userId,
        type: createNotificationDto.type as 'like' | 'event' | 'anniversary',
        message: createNotificationDto.message,
        isRead: false,
      });
      
      const savedNotification = await this.notificationsRepository.save(notification);
      
      return {
        success: true,
        data: this.convertToSharedType(savedNotification),
        message: '알림이 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '알림 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Notification[]>> {
    try {
      const notifications = await this.notificationsRepository.find({
        relations: ['user'],
      });
      return {
        success: true,
        data: notifications.map(entity => this.convertToSharedType(entity)),
        message: '알림 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '알림 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: string): Promise<ApiResponse<Notification>> {
    try {
      const notification = await this.notificationsRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!notification) {
        return {
          success: false,
          message: '알림을 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: this.convertToSharedType(notification),
        message: '알림을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '알림 조회에 실패했습니다.',
      };
    }
  }

  async update(id: string, updateNotificationDto: Partial<CreateNotificationDto>): Promise<ApiResponse<Notification>> {
    try {
      const notification = await this.notificationsRepository.findOne({ where: { id } });
      if (!notification) {
        return {
          success: false,
          message: '알림을 찾을 수 없습니다.',
        };
      }

      Object.assign(notification, updateNotificationDto);
      const updatedNotification = await this.notificationsRepository.save(notification);
      
      return {
        success: true,
        data: this.convertToSharedType(updatedNotification),
        message: '알림이 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '알림 업데이트에 실패했습니다.',
      };
    }
  }

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    try {
      const notification = await this.notificationsRepository.findOne({ where: { id } });
      if (!notification) {
        return {
          success: false,
          message: '알림을 찾을 수 없습니다.',
        };
      }

      notification.isRead = true;
      const updatedNotification = await this.notificationsRepository.save(notification);
      
      return {
        success: true,
        data: this.convertToSharedType(updatedNotification),
        message: '알림이 읽음으로 표시되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '알림 상태 업데이트에 실패했습니다.',
      };
    }
  }

  async remove(id: string): Promise<ApiResponse<void>> {
    try {
      const notification = await this.notificationsRepository.findOne({ where: { id } });
      if (!notification) {
        return {
          success: false,
          message: '알림을 찾을 수 없습니다.',
        };
      }

      await this.notificationsRepository.remove(notification);
      
      return {
        success: true,
        message: '알림이 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '알림 삭제에 실패했습니다.',
      };
    }
  }
} 