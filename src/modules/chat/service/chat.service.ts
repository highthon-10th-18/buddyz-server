import { HttpException, Injectable } from '@nestjs/common';
import { ChatRepository } from '../repository/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {
  }
  async getChatList(userUUID: string) {
    return this.chatRepository.getChatList(userUUID);
  }
  async getChatDetail(chatUUID: string) {
    return this.chatRepository.getChatDetail(chatUUID);
  }
  async getPersonaInChat(chatUUID: string) {
    const chat = await this.chatRepository.getChatDetail(chatUUID);

    if (!chat) {
      throw new HttpException('채팅을 찾을 수 없습니다.', 404);
    }

    return chat.targetPersona;
  }
  async startChat(userUUID: string, personaUUID: string) {
    const exists = await this.chatRepository.getChat(userUUID, personaUUID);

    if (exists) {
      throw new HttpException('이미 채팅이 진행 중입니다.', 409);
    }

    return this.chatRepository.createChat(userUUID, personaUUID);
  }
}
