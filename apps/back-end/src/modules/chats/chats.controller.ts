import { Controller, Get, Post, Body, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiResponse, Chat, ChatMessage } from '@use-navi-date/shared';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() createChatDto: { user2Id: number }, @Request() req): Promise<ApiResponse<Chat>> {
    const user1Id = req.user?.id;
    return this.chatsService.create(user1Id, createChatDto.user2Id);
  }

  @Get()
  findAll(): Promise<ApiResponse<Chat[]>> {
    return this.chatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Chat>> {
    return this.chatsService.findOne(id);
  }

  @Post(':id/messages')
  createMessage(
    @Param('id', ParseIntPipe) chatId: number,
    @Body() createMessageDto: { content: string },
    @Request() req
  ): Promise<ApiResponse<ChatMessage>> {
    const userId = req.user?.id;
    return this.chatsService.createMessage(chatId, userId, createMessageDto.content);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.chatsService.remove(id);
  }
} 