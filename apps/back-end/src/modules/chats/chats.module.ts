import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatMessage]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway],
  exports: [ChatsService],
})
export class ChatsModule {} 