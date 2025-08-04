import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Couple, CreateCoupleDto, ApiResponse } from '@use-navi-date/shared';
import { Couple as CoupleEntity } from './entities/couple.entity';

@Injectable()
export class CouplesService {
  constructor(
    @InjectRepository(CoupleEntity)
    private couplesRepository: Repository<CoupleEntity>,
  ) {}

  async create(createCoupleDto: CreateCoupleDto): Promise<ApiResponse<Couple>> {
    try {
      const couple = this.couplesRepository.create({
        userAId: createCoupleDto.user2Id,
        userBId: null,
        anniversary: new Date().toISOString().split('T')[0],
        name: 'New Couple',
        status: 'pending',
      });
      
      const savedCouple = await this.couplesRepository.save(couple);
      
      return {
        success: true,
        data: savedCouple,
        message: '커플이 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '커플 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Couple[]>> {
    try {
      const couples = await this.couplesRepository.find({
        relations: ['userA', 'userB'],
      });
      return {
        success: true,
        data: couples,
        message: '커플 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '커플 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Couple>> {
    try {
      const couple = await this.couplesRepository.findOne({ 
        where: { id },
        relations: ['userA', 'userB'],
      });
      if (!couple) {
        return {
          success: false,
          message: '커플을 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: couple,
        message: '커플을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '커플 조회에 실패했습니다.',
      };
    }
  }

  async update(id: number, updateCoupleDto: Partial<CreateCoupleDto>): Promise<ApiResponse<Couple>> {
    try {
      const couple = await this.couplesRepository.findOne({ where: { id } });
      if (!couple) {
        return {
          success: false,
          message: '커플을 찾을 수 없습니다.',
        };
      }

      Object.assign(couple, updateCoupleDto);
      const updatedCouple = await this.couplesRepository.save(couple);
      
      return {
        success: true,
        data: updatedCouple,
        message: '커플이 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '커플 업데이트에 실패했습니다.',
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    try {
      const couple = await this.couplesRepository.findOne({ where: { id } });
      if (!couple) {
        return {
          success: false,
          message: '커플을 찾을 수 없습니다.',
        };
      }

      await this.couplesRepository.remove(couple);
      
      return {
        success: true,
        message: '커플이 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '커플 삭제에 실패했습니다.',
      };
    }
  }
} 