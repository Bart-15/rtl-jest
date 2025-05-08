import NewsletterSignup from '@/components/counter/news-letter-signup';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';

const invalidEmailErrorMessage = 'Please enter a valid email address.';

jest.useFakeTimers();

let emailInput: HTMLElement;
let submitBtn: HTMLElement;

describe('Counter Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should news letter signup form component display properly', () => {
    render(<NewsletterSignup />);

    const errorMessage = screen.queryByTestId('error-msg');

    const successMessage = screen.queryByTestId('success-message');

    submitBtn = screen.getByRole('button', {
      name: 'Subscribe',
    });

    expect(errorMessage).not.toBeInTheDocument();
    expect(successMessage).not.toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('should display error message if email input is empty', () => {
    render(<NewsletterSignup />);

    submitBtn = screen.getByRole('button', {
      name: /Subscribe/,
    });

    fireEvent.click(submitBtn);

    const errorMessage = screen.queryByTestId('error-msg');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(invalidEmailErrorMessage);
  });

  test('should display error message if email input is invalid', async () => {
    render(<NewsletterSignup />);

    emailInput = screen.getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'testeEmail' } });

    submitBtn = screen.getByRole('button', {
      name: /Subscribe/,
    });

    fireEvent.click(submitBtn);

    const errorMessage = screen.getByTestId('error-msg');

    expect(emailInput).toHaveValue('testeEmail');
    expect(errorMessage).toBeInTheDocument();
  });

  test(`should display "Thanks for subscribing!" if email input is valid`, async () => {
    render(<NewsletterSignup />);

    emailInput = screen.getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'hello@mail.com' } });

    const submitBtn = screen.getByRole('button', {
      name: /Subscribe/,
    });

    fireEvent.click(submitBtn);

    const successMessage = screen.getByTestId('success-message');

    const errorMessage = screen.queryByTestId('error-msg');

    expect(emailInput).toHaveValue('hello@mail.com');
    expect(errorMessage).not.toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });

  test('should clear forms after 3000 seconds', async () => {
    render(<NewsletterSignup />);
    emailInput = screen.getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'hello@mail.com' } });

    submitBtn = screen.getByRole('button', {
      name: /Subscribe/,
    });

    fireEvent.click(submitBtn);

    // Fast-forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      // Now the form should be cleared
      expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toHaveValue('');
    });
  });

  test('should not clear form if already submitted', () => {
    const setSubmitted = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [true, setSubmitted]);
    render(<NewsletterSignup />);

    emailInput = screen.getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'hello@mail.com' } });

    submitBtn = screen.getByRole('button', {
      name: /Subscribe/,
    });

    fireEvent.click(submitBtn);

    // Fast-forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('email-input')).toHaveValue('');
  });
});
