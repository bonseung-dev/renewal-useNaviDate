import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, ApiResponse, Notification } from '@use-navi-date/shared';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto): Promise<ApiResponse<Notification>> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<Notification[]>> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Notification>> {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNotificationDto: Partial<CreateNotificationDto>): Promise<ApiResponse<Notification>> {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Patch(':id/read')
  markAsRead(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Notification>> {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.notificationsService.remove(id);
  }
} 