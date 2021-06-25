import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', socket => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async params => {
    const socketId = socket.id;
    const { text, email } = params as IParams;

    let user = await usersService.findByEmail(email);

    if (!user) {
      user = await usersService.create(email);
    }

    let connectionId: string;
    const userId = user.id;

    const connection = await connectionsService.findByUserId(userId);

    if (connection) {
      connectionId = connection.id;
    }

    await connectionsService.create({
      userId,
      socketId,
      id: connectionId,
    });

    await messagesService.create({
      text,
      userId,
    });

    const allMessages = await messagesService.listByUser(userId);

    socket.emit('client_list_all_messages', allMessages);
  });

  socket.on('client_send_to_admin', async params => {
    const { text, socketAdminId } = params;

    const { userId } = await connectionsService.findBySocketId(socketAdminId);

    const message = await messagesService.create({ text, userId });
  });
});
