import { Request, Response } from 'express';

import { messagesService } from '../services/MessagesService';

class MessagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { text, userId, adminId } = request.body;

    const message = await messagesService.create({ text, adminId, userId });

    return response.json(message);
  }
}

const messagesController = new MessagesController();

export { messagesController };
