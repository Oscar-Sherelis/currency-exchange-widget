/**
 * LRU Cache — Map-based implementation.
 *
 * JavaScript's Map preserves insertion order and moves a key to the "end"
 * when it is deleted and re-inserted. We exploit this to track recency:
 *   - Most-recently-used  = last entry  (map tail)
 *   - Least-recently-used = first entry (map head)  ← eviction target
 *
 * get() and set() are both O(1) average — same as the doubly-linked-list
 * variant but with less boilerplate, because Map already maintains order.
 */
export class LRUCache<T> {
  private readonly cache = new Map<string, T>();
 
  constructor(private readonly capacity: number) {
    if (capacity <= 0) throw new Error("LRUCache: capacity must be > 0");
  }
 
  get(key: string): T | null {
    if (!this.cache.has(key)) return null;
 
    // Non-null assertion safe: we just confirmed the key exists.
    const value = this.cache.get(key)!;
 
    // Refresh recency: delete then re-insert moves the entry to map tail.
    this.cache.delete(key);
    this.cache.set(key, value);
 
    return value;
  }
 
  set(key: string, value: T): void {
    // Delete first so re-insertion always lands at the tail (most-recent).
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
 
    this.cache.set(key, value);
 
    // Evict the oldest entry (map head) when over capacity.
    if (this.cache.size > this.capacity) {
      // Map.prototype.keys() returns an iterator in insertion order.
      // .next().value is the oldest key — safe because size > 0 here.
      const oldestKey = this.cache.keys().next().value as string;
      this.cache.delete(oldestKey);
    }
  }
 
  get size(): number {
    return this.cache.size;
  }
}