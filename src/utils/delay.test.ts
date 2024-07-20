import { describe, it, expect, vi } from 'vitest';
import delay from './delay';

describe('delay', () => {
  it('should resolve after the specified time', async () => {
    vi.useFakeTimers();

    const delayPromise = delay(1000);

    vi.advanceTimersByTime(1000);

    await expect(delayPromise).resolves.toBeUndefined();

    vi.useRealTimers();
  });

  it('should not resolve before the specified time', async () => {
    vi.useFakeTimers();

    const delayPromise = delay(1000);

    vi.advanceTimersByTime(500);

    let isResolved = false;
    delayPromise.then(() => {
      isResolved = true;
    });

    await Promise.resolve();
    expect(isResolved).toBe(false);

    vi.advanceTimersByTime(500);

    await expect(delayPromise).resolves.toBeUndefined();

    vi.useRealTimers();
  });
});
