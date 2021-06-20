import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { renderFile } from 'ejs';

import './database';

import { routes } from './routes';

const app = express();
const staticPath = path.join(__dirname, '..', 'public');

app.use(express.static(staticPath));
app.set('views', staticPath);
app.engine('html', renderFile);

app.set('view engine', 'html');

app.get('/', (request, response) => {
  return response.render('html/client.html');
});

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('Connect', socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io };
