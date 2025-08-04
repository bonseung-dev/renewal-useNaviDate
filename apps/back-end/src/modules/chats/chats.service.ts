import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat, ChatMessage, ApiResponse } from '@use-navi-date/shared';
import { Chat as ChatEntity } from './entities/chat.entity';
import { ChatMessage as ChatMessageEntity } from './entities/chat-message.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatsRepository: Repository<ChatEntity>,
    @InjectRepository(ChatMessageEntity)
    private chatMessagesRepository: Repository<ChatMessageEntity>,
  ) {}

  async create(userAId: number, userBId: number): Promise<ApiResponse<Chat>> {
    try {
      const chat = this.chatsRepository.create({
        userAId,
        userBId,
        message: '', // 임시 메시지
      });
      
      const savedChat = await this.chatsRepository.save(chat);
      
      return {
        success: true,
        data: savedChat,
        message: '채팅이 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '채팅 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Chat[]>> {
    try {
      const chats = await this.chatsRepository.find({
        relations: ['user1', 'user2', 'messages'],
      });
      return {
        success: true,
        data: chats,
        message: '채팅 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '채팅 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Chat>> {
    try {
      const chat = await this.chatsRepository.findOne({
        where: { id },
        relations: ['user1', 'user2', 'messages'],
      });
      if (!chat) {
        return {
          success: false,
          message: '채팅을 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: chat,
        message: '채팅을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '채팅 조회에 실패했습니다.',
      };
    }
  }

  async createMessage(chatId: number, userId: number, content: string): Promise<ApiResponse<ChatMessage>> {
    try {
      const message = this.chatMessagesRepository.create({
        chatId,
        userId,
        content,
      });
      
      const savedMessage = await this.chatMessagesRepository.save(message);
      
      return {
        success: true,
        data: savedMessage,
        message: '메시지가 성공적으로 전송되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '메시지 전송에 실패했습니다.',
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    try {
      const chat = await this.chatsRepository.findOne({ where: { id } });
      if (!chat) {
        return {
          success: false,
          message: '채팅을 찾을 수 없습니다.',
        };
      }

      await this.chatsRepository.remove(chat);
      
      return {
        success: true,
        message: '채팅이 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '채팅 삭제에 실패했습니다.',
      };
    }
  }
} 