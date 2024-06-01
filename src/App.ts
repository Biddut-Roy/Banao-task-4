import express, { Application } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAlert, checkAlerts } from './controllers/alertController';
import { fetchCryptoPrice } from './services/cryptoService';
import { cryptoRoute } from './app/cryptocurrency/crypto.route';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

// parser
app.use(express.json());
app.use(cors());

app.use(express.json());

app.post('/alerts', createAlert);

app.use('/crypto', cryptoRoute);

setInterval(checkAlerts, 60000);

app.get('/', (req, res) => {
  res.send('server is starting');
});

export default app;
