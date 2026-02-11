import { RateLimiter, rateLimitedCall } from '../services/rateLimiter';

describe('RateLimiter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('allows requests within token limit', async () => {
    const limiter = new RateLimiter(3, 1000);

    await limiter.acquire();
    await limiter.acquire();
    await limiter.acquire();
  });

  it('waits when tokens are exhausted', async () => {
    const limiter = new RateLimiter(1, 1000);

    await limiter.acquire();

    const acquirePromise = limiter.acquire();
    jest.advanceTimersByTime(1000);
    await acquirePromise;
  });

  it('refills tokens after interval', async () => {
    const limiter = new RateLimiter(1, 1000);

    await limiter.acquire();

    jest.advanceTimersByTime(1000);

    await limiter.acquire();
  });
});

describe('rateLimitedCall', () => {
  it('calls the provided function with arguments', async () => {
    const mockFn = jest.fn().mockResolvedValue('result');

    const result = await rateLimitedCall(mockFn, 'arg1', 'arg2');

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    expect(result).toBe('result');
  });

  it('propagates errors from the API function', async () => {
    const mockFn = jest.fn().mockRejectedValue(new Error('API error'));

    await expect(rateLimitedCall(mockFn)).rejects.toThrow('API error');
  });
});
