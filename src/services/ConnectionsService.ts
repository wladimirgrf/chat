import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';

import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionsCreate {
  id?: string;
  socketId: string;
  userId: string;
  adminId?: string;
}

interface IConnectionsUpdateAdminId {
  userId: string;
  adminId: string;
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

  async findBySocketId(socketId: string): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({ socketId });

    return connection;
  }

  async findAllWithoutAdmin(): Promise<Connection[]> {
    const connections = await this.connectionsRepository.find({
      where: { adminId: null },
      relations: ['user'],
    });

    return connections;
  }

  async updateAdminIdByUser({
    userId,
    adminId,
  }: IConnectionsUpdateAdminId): Promise<void> {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ adminId })
      .where('user_id=:userId', { userId })
      .execute();
  }
}

export { ConnectionsService };
