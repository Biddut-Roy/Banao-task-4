import express from 'express';
import { getData } from './crypto.controler';

const router = express.Router();

router.get('/data/:id?', getData);

export const cryptoRoute = router;
