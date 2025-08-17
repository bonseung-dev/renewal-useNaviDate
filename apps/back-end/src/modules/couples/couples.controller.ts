import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { CreateCoupleDto, ApiResponse, Couple } from '@use-navi-date/shared';
@Controller('couples')
export class CouplesController {
  constructor(
    private readonly couplesService: CouplesService,
  ) {}

  @Post()
  create(@Body() createCoupleDto: CreateCoupleDto): Promise<ApiResponse<Couple>> {
    return this.couplesService.create(createCoupleDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<Couple[]>> {
    return this.couplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Couple>> {
    return this.couplesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCoupleDto: Partial<CreateCoupleDto>): Promise<ApiResponse<Couple>> {
    return this.couplesService.update(id, updateCoupleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.couplesService.remove(id);
  }
} 