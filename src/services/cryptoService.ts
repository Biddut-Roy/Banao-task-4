import axios from 'axios';
import { getCache, setCache } from '../utils/cache';
import config from '../app/config';

const fetchCryptoPrice = async (symbol: string): Promise<number> => {
  const cachedPrice = await getCache(symbol);
  if (cachedPrice) {
    return parseFloat(cachedPrice);
  }

  const response = await axios.get(`${config.coin_api}/tickers/${symbol}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const price = response.data.quotes.USD.price;

  await setCache(symbol, price.toString(), 60); // Cache for 60 seconds
  return price;
};

export { fetchCryptoPrice };
