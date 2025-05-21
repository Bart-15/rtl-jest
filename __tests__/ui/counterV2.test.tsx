import CounterRef from '@/components/counter-v2';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

describe('CounterV2 Component test suite', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render properly the CounterRef component', () => {
    render(<CounterRef />);

    expect(screen.getByText('Counter App')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Reset Counter',
      }),
    ).toBeInTheDocument();
  });

  test('reset counter when reset button is clicked', () => {
    render(<CounterRef />);
    const incrementButton = screen.getByTestId('increment-btn');
    const resetButton = screen.getByRole('button', {
      name: 'Reset Counter',
    });
    const countDisplay = screen.getByTestId('count-value');

    // Increment the counter
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(countDisplay).toHaveTextContent('Count: 2');

    // Reset the counter
    fireEvent.click(resetButton);
    expect(countDisplay).toHaveTextContent('Count: 0');
  });
});
