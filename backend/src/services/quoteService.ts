import { getRates } from "./exchangeService.js";

export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "ILS"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

/**
 * Global liquidity spread: 3%.
 * Client receives LESS than the raw market rate.
 * Correct formula: spreadRate = rawRate × (1 - SPREAD)
 *
 * The spread is the provider's margin on the transaction.
 * Applying (1 - SPREAD) means the displayed rate is the executable rate —
 * what the client actually gets, not a theoretical pre-spread figure.
 */
const SPREAD = 0.03;

export interface QuoteResult {
  exchangeRate: number;
  quoteAmount: number;
}

export async function getQuote(
  baseCurrency: string,
  quoteCurrency: string,
  baseAmount: number
): Promise<QuoteResult> {
  const base = baseCurrency.toUpperCase();
  const quote = quoteCurrency.toUpperCase();

  if (
    !SUPPORTED_CURRENCIES.includes(base as SupportedCurrency) ||
    !SUPPORTED_CURRENCIES.includes(quote as SupportedCurrency)
  ) {
    throw new Error(`Unsupported currency. Supported: ${SUPPORTED_CURRENCIES.join(", ")}`);
  }

  console.log('test base ', baseAmount)
  if (base === quote) {
    return { exchangeRate: 1.0, quoteAmount: baseAmount };
  }

  // Fetch rates with base as the pivot — avoids double-conversion rounding
  const data = await getRates(base);
  const rawRate = data.rates[quote];

  if (rawRate === undefined) {
    throw new Error(`No rate available for ${quote}`);
  }

  // Apply spread: client receives less (provider earns the margin)
  const spreadRate = rawRate * (1 - SPREAD);

  // exchangeRate: 3 decimal places — standard FX display precision
  const exchangeRate = Number(spreadRate.toFixed(3));

  const rawQuoteAmount = baseAmount * spreadRate;

  // Round to 2 decimal places and keep as number
  const quoteAmount = Number(rawQuoteAmount.toFixed(2));


  return { exchangeRate, quoteAmount };
}