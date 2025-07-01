import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../../auth/guards/ws-jwt-auth.guard';
import { ChatsService } from './chats.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, Socket> = new Map();

  constructor(private readonly chatsService: ChatsService) {}

  async handleConnection(client: Socket) {
    try {
      // JWT 토큰 검증
      const token = client.handshake.auth.token;
      if (!token) {
        client.disconnect();
        return;
      }

      // 사용자 ID 저장
      const userId = client.handshake.auth.userId;
      this.userSockets.set(userId, client);

      // 사용자 온라인 상태 브로드캐스트
      this.server.emit('userStatus', {
        userId,
        status: 'online',
      });
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // 사용자 ID 찾기
    const userId = Array.from(this.userSockets.entries())
      .find(([_, socket]) => socket === client)?.[0];

    if (userId) {
      this.userSockets.delete(userId);
      
      // 사용자 오프라인 상태 브로드캐스트
      this.server.emit('userStatus', {
        userId,
        status: 'offline',
      });
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.join(roomId);
    return { event: 'joinRoom', data: { roomId } };
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.leave(roomId);
    return { event: 'leaveRoom', data: { roomId } };
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; message: string },
  ) {
    const { roomId, message } = payload;
    const userId = client.handshake.auth.userId;

    // 메시지 저장
    const savedMessage = await this.chatsService.createMessage(
      roomId,
      userId,
      message,
    );

    // 채팅방에 메시지 브로드캐스트
    this.server.to(roomId).emit('newMessage', savedMessage);

    return { event: 'sendMessage', data: savedMessage };
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; isTyping: boolean },
  ) {
    const { roomId, isTyping } = payload;
    const userId = client.handshake.auth.userId;

    // 타이핑 상태 브로드캐스트 (자신을 제외한 채팅방 멤버에게)
    client.to(roomId).emit('userTyping', {
      userId,
      isTyping,
    });

    return { event: 'typing', data: { userId, isTyping } };
  }
} 