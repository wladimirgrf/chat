import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';

import { SettingsRepository } from '../repositories/SettingsRepository';

interface ISetting {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISetting): Promise<Setting> {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const setting = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(setting);

    return setting;
  }

  async findByUsername(username: string): Promise<Setting> {
    const setting = await this.settingsRepository.findOne({ username });

    return setting;
  }

  async update({ chat, username }: ISetting): Promise<void> {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username=:username', { username })
      .execute();
  }
}

export { SettingsService };
