import Counter from '@/components/counter';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

describe('Counter Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('counter component should render properly with correct default value', async () => {
    render(<Counter initialValue={0} />);

    const title = screen.getByRole('heading', {
      name: /counter app/i,
    });

    expect(screen.getByTestId('count-value').textContent).toBe('Count: 0');

    expect(title).toBeInTheDocument();
  });

  test('should increment value when increment button is clicked', async () => {
    render(<Counter initialValue={0} />);

    const incrementBtn = screen.getByTestId('increment-btn');

    fireEvent.click(incrementBtn);

    expect(screen.getByTestId('count-value').textContent).toBe('Count: 1');
  });

  test('should decerement value when decrement button is clicked', async () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [10, jest.fn()]);

    render(<Counter initialValue={10} />);

    expect(screen.getByTestId('count-value').textContent).toBe('Count: 10');

    const decrementBtn = screen.getByTestId('decrement-btn');

    fireEvent.click(decrementBtn);

    expect(screen.getByTestId('count-value').textContent).toBe('Count: 9');
  });

  test('should not decrement below 0', async () => {
    render(<Counter initialValue={0} />);

    const decrementBtn = screen.getByTestId('decrement-btn');
    fireEvent.click(decrementBtn);

    expect(screen.getByTestId('count-value').textContent).toBe('Count: -1');
  });
});
