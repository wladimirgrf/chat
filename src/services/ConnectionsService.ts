import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';

import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionsCreate {
  id?: string;
  socketId: string;
  userId: string;
  adminId?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({
    id,
    socketId,
    userId,
    adminId,
  }: IConnectionsCreate): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      id,
      socketId,
      userId,
      adminId,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(userId: string): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({ userId });

    return connection;
  }
}

export { ConnectionsService };
