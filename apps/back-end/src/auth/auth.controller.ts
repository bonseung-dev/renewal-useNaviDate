import { Controller, Post, Body, Request, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto, AuthResponse, ApiResponse, User } from '@use-navi-date/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleAuth(@Body() googleUser: any, @Res() res: Response) {
    try {
      const result = await this.authService.googleAuth(googleUser);
      
      if (result.success && result.user) {
        const user = result.user;
        const token = result.access_token;
        
        // HttpOnly 쿠키에 토큰 저장
        res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000, // 24시간
        });

        return res.status(HttpStatus.OK).json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            profileImage: user.profileImage,
          },
          message: 'Google 로그인이 성공했습니다.',
        });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: result.message || 'Google 로그인에 실패했습니다.',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(loginDto);
      
      if (result.success && result.user) {
        const user = result.user;
        const token = result.access_token;
        
        // HttpOnly 쿠키에 토큰 저장
        res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000, // 24시간
        });

        return res.status(HttpStatus.OK).json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            profileImage: user.profileImage,
          },
          message: '로그인이 성공했습니다.',
        });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: result.message || '로그인에 실패했습니다.',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.authService.register(createUserDto);
      
      if (result.success && result.user) {
        const user = result.user;
        const token = result.access_token;
        
        // HttpOnly 쿠키에 토큰 저장
        res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000, // 24시간
        });

        return res.status(HttpStatus.CREATED).json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            profileImage: user.profileImage,
          },
          message: '회원가입이 성공했습니다.',
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: result.message || '회원가입에 실패했습니다.',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  }
}
