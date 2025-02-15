import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from '@prisma/client';
import OpenAI from 'openai';
import { PersonaService } from '@/modules/persona/persona.service';
import { UserService } from '@/modules/user/user.service';
import { MessageRepository } from '../repository/message.repository';
import { ChatService } from './chat.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatService: ChatService,
    private readonly personaService: PersonaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
  }
  async getMessages(userUUID: string, chatUUID: string) {
    const chat = await this.chatService.getChatDetail(chatUUID);
    const messages = await this.messageRepository.getMessages(chatUUID);

    if (chat?.userUUID !== userUUID) {
      throw new HttpException('채팅에 참여할 수 없습니다.', 403);
    }

    return messages;
  }
  async createMessage(chatUUID: string, senderUUID: string, message: string) {
    let newMessage: Message;

    if (await this.isSenderPersona(senderUUID)) {
      newMessage = await this.messageRepository.createMessageAsPersona(chatUUID, senderUUID, message);
    } else {
      newMessage = await this.messageRepository.createMessageAsUser(chatUUID, senderUUID, message);
    }

    return newMessage;
  }
  async processMessage(personaUUID: string, messageUUID: string) {
    const targetMessage = await this.messageRepository.getMessageDetail(messageUUID);

    if (!targetMessage) {
      throw new HttpException('메시지를 찾을 수 없습니다.', 404);
    }

    if (targetMessage.persona) {
      throw new HttpException('페르소나의 메세지는 대답할 수 없습니다.', 400);
    }

    const persona = await this.personaService.getPersonaDetail(personaUUID);
    const client = new OpenAI({ apiKey: this.configService.get('OPENAI_KEY') });
    const messages = await this.messageRepository.getMessages(targetMessage.chatUUID);

    const messagesHistory = messages.map(message => ({
      role:    message.personaUUID ? 'assistant' : 'user',
      content: message.content,
    })) as Array<{
      role: 'assistant' | 'user'; content: string;
    }>;

    const completion = await client.chat.completions.create({
      model:    'gpt-4o-mini',
      messages: [
        {
          role:    'system',
          content: `Your name is ${persona.name}.\n${persona.description}\n${persona.characteristics}\nYOU MUST SAY KOREAN.`,
        },
        ...messagesHistory,
        {
          role:    'user',
          content: targetMessage.content,
        },
      ],
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new HttpException('대답을 생성할 수 없습니다.', 500);
    }

    const newMessage = await this.createMessage(targetMessage.chatUUID, personaUUID, response);

    return newMessage;
  }
  async isSenderPersona(senderUUID: string) {
    try {
      const persona = await this.personaService.getPersonaDetail(senderUUID);
      const user = await this.userService.findUserByUUID(senderUUID);

      if (persona) {
        return true;
      } else if (user) {
        return false;
      }
    } catch {
      return false;
    }
  }
}
