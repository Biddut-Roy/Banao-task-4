import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { createAlert, checkAlerts } from './controllers/alertController';
import { fetchCryptoPrice } from './services/cryptoService';
import axios from 'axios';
import { cryptoRoute } from './app/cryptocurrency/crypto.route';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.post('/alerts', createAlert);

app.use('/crypto,', cryptoRoute);

setInterval(checkAlerts, 60000);

app.get('/', (req, res) => {
  res.send('server is starting');
});

export default app;
