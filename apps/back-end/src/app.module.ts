import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './modules/images/images.module';
import { CouplesModule } from './modules/couples/couples.module';
import { PostsModule } from './modules/posts/posts.module';
import { BookmarksModule } from './modules/bookmarks/bookmarks.module';
import { LikesModule } from './modules/likes/likes.module';
import { ChatsModule } from './modules/chats/chats.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AnniversariesModule } from './modules/anniversaries/anniversaries.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import configuration from './config/configuration';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    AuthModule,
    ImagesModule,
    CouplesModule,
    PostsModule,
    BookmarksModule,
    LikesModule,
    ChatsModule,
    SettingsModule,
    AnniversariesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
