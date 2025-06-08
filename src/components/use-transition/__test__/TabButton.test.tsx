import { render, screen } from '@testing-library/react';
import useEvent, { userEvent } from '@testing-library/user-event';
import TabButton from '../TabButton';
import React from 'react';

describe('TabButton', () => {
  it('renders without crashing', () => {
    render(<TabButton>Test Button</TabButton>);
    expect(
      screen.getByRole('button', { name: /test button/i }),
    ).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const event = userEvent.setup();
    const handleClick = jest.fn();

    render(<TabButton onClick={handleClick}>Click Me</TabButton>);
    const button = screen.getByRole('button', { name: /click me/i });

    await event.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state during transition', () => {
    // Mock useTransition hook
    jest
      .spyOn(React, 'useTransition')
      .mockImplementation(() => [true, jest.fn()]);

    render(<TabButton>Test Button</TabButton>);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
