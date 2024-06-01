import express from 'express';
import { cryptoController } from './crypto.controller';

const router = express.Router();

router.get('/data/:id?', cryptoController.getData);
router.get('/', (req, res) => {
  console.log('cheking');

  res.send('chek');
});

export const cryptoRoute = router;
