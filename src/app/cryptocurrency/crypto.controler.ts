import axios from 'axios';
import { RequestHandler } from 'express';

export const getData: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let response;
    if (id) {
      response = await axios.get(
        `https://api.coinpaprika.com/v1/tickers/${id}`,
      );
    } else {
      response = await axios.get(`https://api.coinpaprika.com/v1/tickers`);
    }
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
};
