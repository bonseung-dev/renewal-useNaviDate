import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto, ApiResponse, Setting } from '@use-navi-date/shared';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Request() req): Promise<ApiResponse<Setting>> {
    const userId = req.user?.id;
    return this.settingsService.create(userId);
  }

  @Get()
  findAll(): Promise<ApiResponse<Setting[]>> {
    return this.settingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Setting>> {
    return this.settingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSettingDto: UpdateSettingDto): Promise<ApiResponse<Setting>> {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.settingsService.remove(id);
  }
} 