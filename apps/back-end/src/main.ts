import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DateToISOStringInterceptor } from './modules/common/interceptors/date-to-iso.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
