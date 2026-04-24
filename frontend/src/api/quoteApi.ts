import axios, { type AxiosError } from "axios";
import type { QuoteRequest, QuoteResult, ApiError } from "../types/currency.ts";

/**
 * Centralised axios instance.
 * baseURL is proxied via vite.config.ts in dev (/api → localhost:3000).
 * In production, set VITE_API_BASE_URL to the backend origin.
 */
const apiClient = axios.create({
  baseURL: import.meta.env["VITE_API_BASE_URL"] ?? "http://localhost:3001",
  timeout: 8_000,
  headers: { "Content-Type": "application/json" },
});

export async function fetchQuote(params: QuoteRequest): Promise<QuoteResult> {
  try {
    const response = await apiClient.get<QuoteResult>("/quote", {
      params: {
        baseCurrency: params.baseCurrency,
        quoteCurrency: params.quoteCurrency,
        baseAmount: params.baseAmount,
      },
    });

    console.log('before return ', response)
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<ApiError>;
    const message =
      axiosErr.response?.data?.error ??
      axiosErr.message ??
      "Unable to fetch quote";
    throw new Error(message);
  }
}