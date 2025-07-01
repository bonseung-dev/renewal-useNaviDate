import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { ImagesService } from '../modules/images/images.service';
import { LoginDto, CreateUserDto, AuthResponse, User } from '@use-navi-date/shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private imagesService: ImagesService,
    private jwtService: JwtService,
  ) {}

  async googleAuth(googleUser: any): Promise<AuthResponse> {
    try {
      const { email, name, picture } = googleUser;
      
      // 기존 사용자 확인
      const existingUserResult = await this.usersService.findByEmail(email);
      
      if (existingUserResult.success && existingUserResult.data) {
        // 기존 사용자가 있으면 로그인 처리
        const user = existingUserResult.data;
        const token = await this.generateToken(user);
        
        return {
          success: true,
          user,
          access_token: token.access_token,
          message: 'Google 로그인이 성공했습니다.',
        };
      } else {
        // 새 사용자 생성
        const createUserDto: CreateUserDto = {
          email,
          nickname: name,
          profileImage: picture,
        };
        
        const newUserResult = await this.usersService.create(createUserDto);
        
        if (newUserResult.success && newUserResult.data) {
          const newUser = newUserResult.data;
          
          // 프로필 이미지가 있으면 이미지 엔티티로 저장
          if (picture) {
            const imageData = {
              filename: `profile_${newUser.id}.jpg`,
              originalName: 'profile.jpg',
              mimeType: 'image/jpeg',
              size: 0,
              path: picture,
              url: picture,
              userId: newUser.id,
            };
            
            const imageResult = await this.imagesService.create(imageData);
            if (imageResult.success && imageResult.data) {
              await this.usersService.updateProfileImage(newUser.id, imageResult.data.id);
            }
          }
          
          const token = await this.generateToken(newUser);
          
          return {
            success: true,
            user: newUser,
            access_token: token.access_token,
            message: 'Google 회원가입이 성공했습니다.',
          };
        } else {
          return {
            success: false,
            message: newUserResult.message || '사용자 생성에 실패했습니다.',
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      const userResult = await this.usersService.findByEmail(loginDto.email);
      
      if (!userResult.success || !userResult.data) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }
      
      const user = userResult.data;
      
      // 비밀번호 검증 (비밀번호가 있는 경우)
      if (user.password) {
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
          return {
            success: false,
            message: '비밀번호가 올바르지 않습니다.',
          };
        }
      }
      
      const token = await this.generateToken(user);
      
      return {
        success: true,
        user,
        access_token: token.access_token,
        message: '로그인이 성공했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    try {
      const userResult = await this.usersService.create(createUserDto);
      
      if (!userResult.success || !userResult.data) {
        return {
          success: false,
          message: userResult.message || '회원가입에 실패했습니다.',
        };
      }
      
      const user = userResult.data;
      const token = await this.generateToken(user);
      
      return {
        success: true,
        user,
        access_token: token.access_token,
        message: '회원가입이 성공했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
