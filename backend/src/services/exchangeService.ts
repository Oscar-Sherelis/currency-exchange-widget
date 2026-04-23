import axios from 'axios';
import { LRUCache } from '../cache/LRUCache.js';

const cache = new LRUCache<any>(5);

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function getRates() {
  const cached = cache.get('rates');

  if (cached) {
    return cached;
  }

  const response = await axios.get(API_URL);

  cache.set('rates', response.data);

  return response.data;
}