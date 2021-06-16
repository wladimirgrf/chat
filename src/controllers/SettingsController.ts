import { Request, Response } from 'express';

import { settingsService } from '../services/SettingsService';

class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    try {
      const setting = await settingsService.create({ chat, username });

      return response.json(setting);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

const settingsController = new SettingsController();

export { settingsController };
