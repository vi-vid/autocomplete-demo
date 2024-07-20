import { describe, it, expect, vi } from 'vitest';
import debounce from './debounce';

describe('debounce', () => {
  it('should call the function after the specified timeout', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    expect(func).not.toBeCalled();

    vi.advanceTimersByTime(1000);
    expect(func).toBeCalledTimes(1);
  });

  it('should reset the timer if called again within the timeout period', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    vi.advanceTimersByTime(500);
    expect(func).not.toBeCalled();

    debouncedFunc();
    vi.advanceTimersByTime(500);
    expect(func).not.toBeCalled();

    vi.advanceTimersByTime(500);
    expect(func).toBeCalledTimes(1);
  });

  it('should pass the arguments to the debounced function', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc('test argument 1', 'test argument 2');
    vi.advanceTimersByTime(1000);
    expect(func).toBeCalledWith('test argument 1', 'test argument 2');
  });
});
