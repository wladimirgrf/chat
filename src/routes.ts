import { Router } from 'express';

import { settingsController } from './controllers/SettingsController';
import { usersController } from './controllers/UsersController';
import { messagesController } from './controllers/MessagesController';

const routes = Router();

routes.post('/settings', settingsController.create);

routes.post('/users', usersController.create);

routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByUser);

export { routes };
