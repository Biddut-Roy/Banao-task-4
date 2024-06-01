import { Request, Response } from 'express';
import Alert from '../models/Alert';
import { fetchCryptoPrice } from '../services/cryptoService';

const createAlert = async (req: Request, res: Response) => {
  const { id, symbol, targetPrice, direction } = req.body;
  const alert = new Alert({ id, symbol, targetPrice, direction });
  await alert.save();
  res.status(201).send(alert);
};

const checkAlerts = async () => {
  const alerts = await Alert.find({ notified: false });
  for (const alert of alerts) {
    const currentPrice = await fetchCryptoPrice(alert.id);
    if (
      (alert.direction === 'above' && currentPrice > alert.targetPrice) ||
      (alert.direction === 'below' && currentPrice < alert.targetPrice)
    ) {
      // Notify the user (this could be via email, SMS, etc.)
      alert.notified = true;
      await alert.save();
      console.log(
        `Alert triggered for ${alert.id}: ${alert.symbol} is  ${alert.targetPrice}`,
      );
    }
  }
};

export { createAlert, checkAlerts };
