import { HttpException, Injectable } from '@nestjs/common';
import { ChatRepository } from '../repository/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {
  }
  async getChatList(userUUID: string) {
    return this.chatRepository.getChatList(userUUID);
  }
  async startChat(userUUID: string, personaUUID: string) {
    const exists = await this.chatRepository.getChat(userUUID, personaUUID);

    if (exists) {
      throw new HttpException('이미 채팅이 진행 중입니다.', 409);
    }

    return this.chatRepository.createChat(userUUID, personaUUID);
  }
}
