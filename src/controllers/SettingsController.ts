import { Request, Response } from 'express';

import { SettingsService } from '../services/SettingsService';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();

    try {
      const setting = await settingsService.create({ chat, username });

      return response.json(setting);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();

    await settingsService.update({ chat, username });

    return response.status(204).json();
  }

  async findByUsername(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const setting = await settingsService.findByUsername(username);

    return response.json(setting);
  }
}

const settingsController = new SettingsController();

export { settingsController };
