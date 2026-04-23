import { getRates } from './exchangeService.js';

const SUPPORTED = ['USD', 'EUR', 'GBP', 'ILS'];
const SPREAD = 0.03;

export async function getQuote(
  baseCurrency: string,
  quoteCurrency: string,
  baseAmount: number
) {
  if (!SUPPORTED.includes(baseCurrency) || !SUPPORTED.includes(quoteCurrency)) {
    throw new Error('Unsupported currency');
  }

  const data = await getRates();

  const rates = data.rates;

  // Convert base -> USD if needed
  let amountInUSD =
    baseCurrency === 'USD'
      ? baseAmount / 100
      : (baseAmount / 100) / rates[baseCurrency];

  // Convert USD -> quote
  let rate =
    quoteCurrency === 'USD'
      ? 1
      : rates[quoteCurrency];

  let finalRate = rate * (1 + SPREAD);

  const quoteAmount = Math.round(amountInUSD * finalRate * 100);

  return {
    exchangeRate: Number(finalRate.toFixed(3)),
    quoteAmount,
  };
}