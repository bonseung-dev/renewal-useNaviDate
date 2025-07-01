import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouplesService } from './couples.service';
import { CouplesController } from './couples.controller';
import { Couple } from './entities/couple.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Couple])],
  controllers: [CouplesController],
  providers: [CouplesService],
  exports: [CouplesService],
})
export class CouplesModule {} 