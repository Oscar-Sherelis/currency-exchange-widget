import { Router, type Request, type Response } from "express";
import { getQuote } from "../services/quoteService.js";

const router = Router();

/**
 * GET /quote
 * Query params: baseCurrency, quoteCurrency, baseAmount (cents, integer)
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { baseCurrency, quoteCurrency, baseAmount } = req.query;

  if (!baseCurrency || !quoteCurrency || !baseAmount) {
    res.status(400).json({
      error: "Missing required parameters: baseCurrency, quoteCurrency, baseAmount",
    });
    return;
  }

  const amount = parseInt(String(baseAmount), 10);
  if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ error: "baseAmount must be a positive integer (cents)" });
    return;
  }

  try {
    const result = await getQuote(String(baseCurrency), String(quoteCurrency), amount);
    res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    // 400 for domain errors (unsupported currency), 503 for upstream failures
    const status = message.includes("Unsupported") ? 400 : 503;
    res.status(status).json({ error: message });
  }
});

export default router;