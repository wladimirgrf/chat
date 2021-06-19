import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';

import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessagesCreate {
  text: string;
  userId: string;
  adminId?: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ text, adminId, userId }: IMessagesCreate): Promise<Message> {
    const message = this.messagesRepository.create({
      text,
      adminId,
      userId,
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(userId: string): Promise<Message[]> {
    const list = await this.messagesRepository.find({
      where: { userId },
      relations: ['user'],
    });

    return list;
  }
}

export { MessagesService };
