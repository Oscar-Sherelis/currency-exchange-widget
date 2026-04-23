export class LRUCache<T> {
  private cache = new Map<string, T>();

  constructor(private capacity: number) {}

  get(key: string): T | null {
    if (!this.cache.has(key)) return null;

    const value = this.cache.get(key)!;

    // move to end (recently used)
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  set(key: string, value: T) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next();

      if (oldestKey && oldestKey.done === false) {
        this.cache.delete(oldestKey.value);
      }
    }
  }
}
