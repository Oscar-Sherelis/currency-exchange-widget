import { Router } from 'express';
import { getQuote } from '../services/quoteService.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { baseCurrency, quoteCurrency, baseAmount } = req.query;

    if (!baseCurrency || !quoteCurrency || !baseAmount) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const result = await getQuote(
      String(baseCurrency),
      String(quoteCurrency),
      Number(baseAmount)
    );

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;