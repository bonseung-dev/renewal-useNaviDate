import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnniversariesService } from './anniversaries.service';
import { AnniversariesController } from './anniversaries.controller';
import { Anniversary } from './entities/anniversary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anniversary])],
  controllers: [AnniversariesController],
  providers: [AnniversariesService],
  exports: [AnniversariesService],
})
export class AnniversariesModule {} 