import { Router } from 'express';

import { settingsController } from './controllers/SettingsController';
import { usersController } from './controllers/UsersController';

const routes = Router();

routes.post('/settings', settingsController.create);
routes.post('/users', usersController.create);

export { routes };
