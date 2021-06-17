import { getCustomRepository } from 'typeorm';

import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessagesCreate {
  text: string;
  userId: string;
  adminId?: string;
}

class MessagesService {
  async create({ text, adminId, userId }: IMessagesCreate) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({
      text,
      adminId,
      userId,
    });

    await messagesRepository.save(message);

    return message;
  }
}

const messagesService = new MessagesService();

export { messagesService };
