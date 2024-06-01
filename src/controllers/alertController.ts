import { getCachedPrice } from '../utils/cache';

class Alert {
  coinId: string;
  targetPrice: number;
  direction: 'above' | 'below';

  constructor(
    coinId: string,
    targetPrice: number,
    direction: 'above' | 'below' = 'above',
  ) {
    this.coinId = coinId;
    this.targetPrice = targetPrice;
    this.direction = direction;
  }

  async checkAlert(): Promise<void> {
    const currentPrice = await getCachedPrice(this.coinId);
    if (this.direction === 'above' && currentPrice >= this.targetPrice) {
      console.log(
        `Alert: ${this.coinId} price is above ${this.targetPrice}: $${currentPrice}`,
      );
    } else if (this.direction === 'below' && currentPrice <= this.targetPrice) {
      console.log(
        `Alert: ${this.coinId} price is below ${this.targetPrice}: $${currentPrice}`,
      );
    }
  }
}

export { Alert };
