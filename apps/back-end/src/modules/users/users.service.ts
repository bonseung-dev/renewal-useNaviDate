import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, CreateUserDto, ApiResponse } from '@use-navi-date/shared';
import { User as UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  private convertToSharedType(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      nickname: entity.nickname,
      profileImage: entity.profileImage,
      createdAt: entity.createdAt.toISOString(),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const user = this.usersRepository.create({
        email: createUserDto.email,
        password: createUserDto.password || '',
        nickname: createUserDto.nickname,
        profileImage: createUserDto.profileImage || '',
      });
      
      const savedUser = await this.usersRepository.save(user);
      
      return {
        success: true,
        data: this.convertToSharedType(savedUser),
        message: '사용자가 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<User[]>> {
    try {
      const users = await this.usersRepository.find();
      return {
        success: true,
        data: users.map(entity => this.convertToSharedType(entity)),
        message: '사용자 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: this.convertToSharedType(user),
        message: '사용자를 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 조회에 실패했습니다.',
      };
    }
  }

  async findByEmail(email: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: this.convertToSharedType(user),
        message: '사용자를 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 조회에 실패했습니다.',
      };
    }
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }

      Object.assign(user, updateUserDto);
      const updatedUser = await this.usersRepository.save(user);
      
      return {
        success: true,
        data: this.convertToSharedType(updatedUser),
        message: '사용자가 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 업데이트에 실패했습니다.',
      };
    }
  }

  async updateProfile(id: string, updateData: Partial<CreateUserDto>): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }

      if (updateData.password) {
        const salt = await bcrypt.genSalt();
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      Object.assign(user, updateData);
      const updatedUser = await this.usersRepository.save(user);
      
      return {
        success: true,
        data: this.convertToSharedType(updatedUser),
        message: '사용자가 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 업데이트에 실패했습니다.',
      };
    }
  }

  async updateProfileImage(id: string, imageId: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }
             user.profileImage = imageId;
      const updatedUser = await this.usersRepository.save(user);
      
      return {
        success: true,
        data: this.convertToSharedType(updatedUser),
        message: '사용자 프로필 이미지가 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 프로필 이미지 업데이트에 실패했습니다.',
      };
    }
  }

  async updateNickname(id: string, nickname: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }

      user.nickname = nickname;
      const updatedUser = await this.usersRepository.save(user);
      
      return {
        success: true,
        data: this.convertToSharedType(updatedUser),
        message: '닉네임이 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '닉네임 업데이트에 실패했습니다.',
      };
    }
  }

  async remove(id: string): Promise<ApiResponse<void>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }

      await this.usersRepository.remove(user);
      
      return {
        success: true,
        message: '사용자가 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '사용자 삭제에 실패했습니다.',
      };
    }
  }
} 