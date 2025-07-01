import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { AnniversariesService } from './anniversaries.service';
import { CreateAnniversaryDto, ApiResponse, Anniversary } from '@use-navi-date/shared';

@Controller('anniversaries')
export class AnniversariesController {
  constructor(private readonly anniversariesService: AnniversariesService) {}

  @Post()
  create(@Body() createAnniversaryDto: CreateAnniversaryDto): Promise<ApiResponse<Anniversary>> {
    return this.anniversariesService.create(createAnniversaryDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<Anniversary[]>> {
    return this.anniversariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ApiResponse<Anniversary>> {
    return this.anniversariesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnniversaryDto: Partial<CreateAnniversaryDto>): Promise<ApiResponse<Anniversary>> {
    return this.anniversariesService.update(id, updateAnniversaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    return this.anniversariesService.remove(id);
  }
}