import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Anniversary>> {
    return this.anniversariesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnniversaryDto: Partial<CreateAnniversaryDto>): Promise<ApiResponse<Anniversary>> {
    return this.anniversariesService.update(id, updateAnniversaryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.anniversariesService.remove(id);
  }
}