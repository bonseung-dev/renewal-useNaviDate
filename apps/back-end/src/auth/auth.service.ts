import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { LoginDto, CreateUserDto, AuthResponse, User as SharedUser } from '@use-navi-date/shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  getGoogleAuthUrl(): string {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/callback';
    const scope = 'email profile';
    
    const params = new URLSearchParams();
    if (clientId) params.append('client_id', clientId);
    params.append('redirect_uri', redirectUri);
    params.append('response_type', 'code');
    params.append('scope', scope);
    params.append('access_type', 'offline');
    params.append('prompt', 'consent');
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async handleGoogleCallback(code: string): Promise<AuthResponse> {
    try {
      console.log('🔍 Google OAuth 토큰 교환 시작');
      
      // Google OAuth 토큰 교환
      const tokenResponse = await this.exchangeCodeForToken(code);
      
      console.log('🔍 토큰 교환 결과:', { 
        hasAccessToken: !!tokenResponse.access_token,
        error: tokenResponse.error 
      });
      
      if (!tokenResponse.access_token) {
        console.error('🔍 토큰 교환 실패:', tokenResponse);
        return {
          success: false,
          message: 'Google 토큰을 받을 수 없습니다.',
        };
      }

      console.log('🔍 Google 사용자 정보 조회 시작');
      
      // Google 사용자 정보 가져오기
      const googleUser = await this.getGoogleUserInfo(tokenResponse.access_token);
      const { email, name, picture, sub: googleId } = googleUser;
      
      console.log('🔍 Google 사용자 정보:', { 
        hasEmail: !!email,
        hasName: !!name,
        hasPicture: !!picture,
        hasGoogleId: !!googleId 
      });

      if (!email) {
        console.error('🔍 이메일 정보 없음:', googleUser);
        return {
          success: false,
          message: '이메일 정보가 필요합니다.',
        };
      }

      console.log('🔍 사용자 조회/생성 시작');
      
      // 기존 사용자 확인
      let user = await this.userRepository.findOne({
        where: [
          { email },
          { googleId: googleId }
        ]
      });

      if (user) {
        console.log('🔍 기존 사용자 업데이트:', user.id);
        // 기존 사용자 정보 업데이트
        user.nickname = name || user.nickname;
        user.profileImage = picture || user.profileImage;
        user.googleId = googleId;
        
        await this.userRepository.save(user);
      } else {
        console.log('🔍 새 사용자 생성');
        // 새 사용자 생성
        user = this.userRepository.create({
          email,
          nickname: name || email.split('@')[0],
          profileImage: picture,
          googleId: googleId,
        });

        await this.userRepository.save(user);
      }

      console.log('🔍 JWT 토큰 생성');
      
      // JWT 토큰 생성
      const payload_jwt = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload_jwt);

      console.log('🔍 Google OAuth 성공:', user.id);
      
      return {
        success: true,
        user: user,
        access_token,
        message: 'Google 로그인이 성공했습니다.',
      };
    } catch (error) {
      console.error('🔍 Google OAuth 오류:', error);
      return {
        success: false,
        message: 'Google 로그인에 실패했습니다.',
      };
    }
  }

  async googleAuth(googleUser: any): Promise<AuthResponse> {
    try {
      const { email, name, picture, sub: googleId } = googleUser;

      if (!email) {
        return {
          success: false,
          message: '이메일 정보가 필요합니다.',
        };
      }

      // 기존 사용자 확인
      let user = await this.userRepository.findOne({
        where: [
          { email },
          { googleId: googleId }
        ]
      });

      if (user) {
        // 기존 사용자 정보 업데이트
        user.nickname = name || user.nickname;
        user.profileImage = picture || user.profileImage;
        user.googleId = googleId;
        
        await this.userRepository.save(user);
      } else {
        // 새 사용자 생성
        user = this.userRepository.create({
          email,
          nickname: name || email.split('@')[0],
          profileImage: picture,
          googleId: googleId,
        });

        await this.userRepository.save(user);
      }

      // JWT 토큰 생성
      const payload = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload);

      return {
        success: true,
        user: user,
        access_token,
        message: 'Google 로그인이 성공했습니다.',
      };
    } catch (error) {
      console.error('Google Auth 오류:', error);
      return {
        success: false,
        message: 'Google 로그인에 실패했습니다.',
      };
    }
  }

  private async exchangeCodeForToken(code: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback';
    
    const params = new URLSearchParams();
    if (clientId) params.append('client_id', clientId);
    if (clientSecret) params.append('client_secret', clientSecret);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectUri);
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    return await response.json();
  }

  private async getGoogleUserInfo(accessToken: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    return await response.json();
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      const { email, password } = loginDto;

      // 사용자 찾기
      const user = await this.userRepository.findOne({
        where: { email }
      });

      if (!user) {
        return {
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        };
      }

      // 비밀번호 확인
      if (!user.password) {
        return {
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        };
      }

      // JWT 토큰 생성
      const payload = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload);

      return {
        success: true,
        user: user,
        access_token,
        message: '로그인이 성공했습니다.',
      };
    } catch (error) {
      console.error('로그인 오류:', error);
      return {
        success: false,
        message: '로그인 처리 중 오류가 발생했습니다.',
      };
    }
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    try {
      const { email, password, nickname } = createUserDto;

      // 이메일 중복 확인
      const existingUser = await this.userRepository.findOne({
        where: { email }
      });

      if (existingUser) {
        return {
          success: false,
          message: '이미 존재하는 이메일입니다.',
        };
      }

      // 비밀번호 해시화
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password || '', saltRounds);

      // 새 사용자 생성
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
        nickname: nickname || email.split('@')[0],
      });

      await this.userRepository.save(user);

      // JWT 토큰 생성
      const payload = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload);

      return {
        success: true,
        user: user,
        access_token,
        message: '회원가입이 성공했습니다.',
      };
    } catch (error) {
      console.error('회원가입 오류:', error);
      return {
        success: false,
        message: '회원가입 처리 중 오류가 발생했습니다.',
      };
    }
  }
}
