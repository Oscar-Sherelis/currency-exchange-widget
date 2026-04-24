export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "ILS"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export interface QuoteRequest {
  baseCurrency: SupportedCurrency;
  quoteCurrency: SupportedCurrency;
  /** Amount in cents, e.g. 10000 = $100.00 */
  baseAmount: number;
}

export interface QuoteResult {
  exchangeRate: number;
  /** Amount in cents */
  quoteAmount: number;
}

export interface ApiError {
  error: string;
}

export const CURRENCY_META: Record<SupportedCurrency, { symbol: string; flag: string; label: string }> = {
  USD: { symbol: "$", flag: "🇺🇸", label: "US Dollar" },
  EUR: { symbol: "€", flag: "🇪🇺", label: "Euro" },
  GBP: { symbol: "£", flag: "🇬🇧", label: "Brit. Pound" },
  ILS: { symbol: "₪", flag: "🇮🇱", label: "Israeli Shekel" },
};