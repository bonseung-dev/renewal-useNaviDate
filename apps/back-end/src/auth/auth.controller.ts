import { Controller, Post, Get, Body, Request, Res, HttpStatus, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto, AuthResponse, ApiResponse, User } from '@use-navi-date/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/url')
  async getGoogleAuthUrl() {
    try {
      const url = this.authService.getGoogleAuthUrl();
      return {
        success: true,
        url,
        message: 'Google OAuth URL이 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Google OAuth URL을 생성할 수 없습니다.',
      };
    }
  }

  @Get('google')
  async googleOAuthStart(@Res() res: Response) {
    try {
      // Google OAuth URL 생성
      const googleAuthUrl = this.authService.getGoogleAuthUrl();
      return res.redirect(googleAuthUrl);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Google OAuth를 시작할 수 없습니다.',
      });
    }
  }

  @Get('google/callback')
  async googleOAuthCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const result = await this.authService.handleGoogleCallback(code);
      
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

        // 프론트엔드로 리다이렉트
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        return res.redirect(`${frontendUrl}/auth/callback?success=true`);
      } else {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent(result.message || 'Google 로그인에 실패했습니다.')}`);
      }
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent('서버 오류가 발생했습니다.')}`);
    }
  }

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
