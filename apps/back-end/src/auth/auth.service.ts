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
    // access_type을 'online'으로 변경하여 응답 속도 개선
    params.append('access_type', 'online');
    // prompt 제거하여 추가 확인 단계 생략
    // params.append('prompt', 'consent');
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async handleGoogleCallback(code: string): Promise<AuthResponse> {
    try {
      // Google OAuth 토큰 교환
      const tokenResponse = await this.exchangeCodeForToken(code);
      
      if (!tokenResponse.access_token) {
        return {
          success: false,
          message: 'Google 토큰을 받을 수 없습니다.',
        };
      }

      // Google 사용자 정보 가져오기
      const googleUser = await this.getGoogleUserInfo(tokenResponse.access_token);
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
      const payload_jwt = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload_jwt);
      
      return {
        success: true,
        user: user,
        access_token,
        message: 'Google 로그인이 성공했습니다.',
      };
    } catch (error) {
      console.error('Google OAuth 오류:', error);
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
