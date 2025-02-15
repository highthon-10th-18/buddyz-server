import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../repository/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {
  }
  async getChatList(userUUID: string) {
    return this.chatRepository.getChatList(userUUID);
  }
}
