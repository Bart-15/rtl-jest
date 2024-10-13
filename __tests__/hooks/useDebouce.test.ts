import useDebounce from '@/hooks/useDebounce';
import { act, renderHook } from '@testing-library/react';

Object.defineProperty(global, 'performance', {
  writable: true,
});

describe('should useDebounce work properly', () => {
  test('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  test('should handle rapid successive updates to the value parameter', () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' },
      },
    );

    rerender({ value: 'Bart Tabusao' });
    rerender({ value: 'Bart' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('Bart');
  });
});
