import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DateToISOStringInterceptor } from './modules/common/interceptors/date-to-iso.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Express CORS 미들웨어 직접 추가
  app.use(cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3001',
      process.env.BACKEND_URL || 'http://localhost:3000'
    ],
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['*'],
  }));
  
  // 정적 파일 서빙 설정 (uploads 디렉토리)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  
  // JSON 파싱 미들웨어 (일반 API 요청용)
  app.use(require('express').json({ limit: '50mb' }));
  app.use(require('express').urlencoded({ limit: '50mb', extended: true }));
  
  // NestJS CORS 설정 (백업용)
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3001',
      process.env.BACKEND_URL || 'http://localhost:3000'
    ],
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['*'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalInterceptors(new DateToISOStringInterceptor());
  console.log('PORT:', process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
