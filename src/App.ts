import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { createAlert, checkAlerts } from './controllers/alertController';
import { fetchCryptoPrice } from './services/cryptoService';
import axios from 'axios';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.post('/alerts', createAlert);

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.coinpaprika.com/v1/tickers');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

setInterval(checkAlerts, 60000);

app.get('/', (req, res) => {
  res.send('server is starting');
});

export default app;
