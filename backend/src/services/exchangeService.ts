import axios from "axios";
import { LRUCache } from "../cache/LRUCache.js";

/**
 * Cache stores the full API response keyed by base currency.
 * Using the base currency as the key (not a hardcoded "rates") means
 * we can support any base in the future without cache pollution.
 */
interface RateApiResponse {
  base: string;
  rates: Record<string, number>;
  time_last_updated: number;
}

interface CachedRates {
  data: RateApiResponse;
  fetchedAt: number;
}

const CACHE_TTL_MS = 60_000; // 1 minute
const cache = new LRUCache<CachedRates>(5);

const API_BASE = "https://api.exchangerate-api.com/v4/latest";

export async function getRates(baseCurrency: string): Promise<RateApiResponse> {
  const cached = cache.get(baseCurrency);
  const now = Date.now();

  if (cached !== null && now - cached.fetchedAt < CACHE_TTL_MS) {
    console.log(`[Cache HIT]  ${baseCurrency}`);
    return cached.data;
  }

  console.log(`[Cache MISS] ${baseCurrency} — fetching from API`);
  const response = await axios.get<RateApiResponse>(`${API_BASE}/${baseCurrency}`);
  cache.set(baseCurrency, { data: response.data, fetchedAt: now });

  return response.data;
}