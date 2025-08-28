import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anniversary, CreateAnniversaryDto, ApiResponse } from '@use-navi-date/shared';
import { Anniversary as AnniversaryEntity } from './entities/anniversary.entity';

@Injectable()
export class AnniversariesService {
  constructor(
    @InjectRepository(AnniversaryEntity)
    private readonly anniversariesRepository: Repository<AnniversaryEntity>,
  ) {}

  async create(createAnniversaryDto: CreateAnniversaryDto): Promise<ApiResponse<Anniversary>> {
    try {
      const anniversary = this.anniversariesRepository.create({
        coupleId: createAnniversaryDto.coupleId,
        title: createAnniversaryDto.title,
        date: createAnniversaryDto.date,
        repeat: createAnniversaryDto.repeat,
        memo: createAnniversaryDto.memo,
        createdBy: createAnniversaryDto.createdBy || 0,
      });
      
      const savedAnniversary = await this.anniversariesRepository.save(anniversary);
      
      return {
        success: true,
        data: savedAnniversary,
        message: '기념일이 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '기념일 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Anniversary[]>> {
    try {
      const anniversaries = await this.anniversariesRepository.find({
        relations: ['couple'],
      });
      return {
        success: true,
        data: anniversaries,
        message: '기념일 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '기념일 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Anniversary>> {
    try {
      const anniversary = await this.anniversariesRepository.findOne({ 
        where: { id },
        relations: ['couple'],
      });
      if (!anniversary) {
        return {
          success: false,
          message: '기념일을 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: anniversary,
        message: '기념일을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '기념일 조회에 실패했습니다.',
      };
    }
  }

  async update(id: number, updateAnniversaryDto: Partial<CreateAnniversaryDto>): Promise<ApiResponse<Anniversary>> {
    try {
      const anniversary = await this.anniversariesRepository.findOne({ where: { id } });
      if (!anniversary) {
        return {
          success: false,
          message: '기념일을 찾을 수 없습니다.',
        };
      }

      Object.assign(anniversary, updateAnniversaryDto);
      const updatedAnniversary = await this.anniversariesRepository.save(anniversary);
      
      return {
        success: true,
        data: updatedAnniversary,
        message: '기념일이 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '기념일 업데이트에 실패했습니다.',
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    try {
      const anniversary = await this.anniversariesRepository.findOne({ where: { id } });
      if (!anniversary) {
        return {
          success: false,
          message: '기념일을 찾을 수 없습니다.',
        };
      }

      await this.anniversariesRepository.remove(anniversary);
      
      return {
        success: true,
        message: '기념일이 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '기념일 삭제에 실패했습니다.',
      };
    }
  }
} 