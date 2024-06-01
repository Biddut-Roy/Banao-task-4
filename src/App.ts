import express, { Application } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { cryptoRoute } from './app/cryptocurrency/crypto.route';
import { checkAlerts, createAlert } from './controllers/alertController';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);
// parser
app.use(express.json());
app.use(cors());

app.use(express.json());

app.post('/alerts', createAlert);

setInterval(checkAlerts, 60000);

app.use('/crypto', cryptoRoute);

app.get('/', (req, res) => {
  res.send('server is starting');
});

export default app;
