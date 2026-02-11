export class RateLimiter {
  private tokens: number;
  private readonly maxTokens: number;
  private readonly refillIntervalMs: number;
  private lastRefill: number;

  constructor(maxTokens: number, refillIntervalMs: number) {
    this.tokens = maxTokens;
    this.maxTokens = maxTokens;
    this.refillIntervalMs = refillIntervalMs;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    if (now - this.lastRefill >= this.refillIntervalMs) {
      this.tokens = this.maxTokens;
      this.lastRefill = now;
    }
  }

  async acquire(): Promise<void> {
    this.refill();

    if (this.tokens > 0) {
      this.tokens--;
      return;
    }

    const waitTime = this.refillIntervalMs - (Date.now() - this.lastRefill);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    this.refill();
    this.tokens--;
  }
}

const limiter = new RateLimiter(5, 10_000);

export async function rateLimitedCall<T>(
  apiFn: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<T> {
  await limiter.acquire();
  return apiFn(...args);
}
