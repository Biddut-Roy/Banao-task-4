import axios from 'axios';
import { getCache, setCache } from '../utils/cache';
import config from '../app/config';
const COINPAPRIKA_API_URL = config.coin_api;

const fetchCryptoPrice = async (coinId: string): Promise<number> => {
  const cachedPrice = await getCache(coinId);
  if (cachedPrice) {
    return parseFloat(cachedPrice);
  }

  const response = await axios.get(`${COINPAPRIKA_API_URL}/tickers/${coinId}`);
  const price = response.data.quotes.USD.price;

  console.log(price);

  await setCache(coinId, price.toString(), 60);
  return price;
};

export { fetchCryptoPrice };
