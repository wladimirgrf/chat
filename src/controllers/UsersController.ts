import { Request, Response } from 'express';

import { usersService } from '../services/UsersService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const user = await usersService.create(email);

    return response.json(user);
  }
}

const usersController = new UsersController();

export { usersController };
