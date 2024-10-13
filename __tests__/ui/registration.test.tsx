import Reigster from '@/components/registration/Regsiter';
import {
  registerUserPayload,
  registerUserValidationSchema,
} from '@/validation/register.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { useForm } from 'react-hook-form';

const initFormValues = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

describe('Register Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should display register content display properly', () => {
    render(<Reigster />);
  });

  test('should intitialize form with default values', () => {
    const { result } = renderHook(() =>
      useForm<registerUserPayload>({
        mode: 'onSubmit',
        resolver: zodResolver(registerUserValidationSchema),
        defaultValues: initFormValues,
      }),
    );

    expect(result.current.getValues()).toEqual(initFormValues);
  });

  test('should show validation errors when submitting empty fields', async () => {
    const { getByText } = render(<Reigster />);

    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText('Firstname is required')).toBeInTheDocument();
      expect(screen.getByText('Lastname is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(
        screen.getByText('Confirm password is required'),
      ).toBeInTheDocument();
    });
  });

  test('should show validation errors when password and confirm password dont match', async () => {
    const { getByText } = render(<Reigster />);

    const pwdInput = screen.getByPlaceholderText('Password');
    const pwdConfirmPass = screen.getByPlaceholderText('Confirm password');

    fireEvent.change(pwdInput, { target: { value: 'test-password' } });
    fireEvent.change(pwdConfirmPass, { target: { value: 'test' } });

    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText(`Password don't match`)).toBeInTheDocument();
    });
  });

  test(`should Password don't match message will disappear if password and confirm password value is the same`, () => {
    const { getByText } = render(<Reigster />);

    const pwdInput = screen.getByPlaceholderText('Password');
    const pwdConfirmPass = screen.getByPlaceholderText('Confirm password');

    fireEvent.change(pwdInput, { target: { value: 'test-password' } });
    fireEvent.change(pwdConfirmPass, { target: { value: 'test-password' } });

    fireEvent.click(getByText('Save'));

    expect(screen.queryByText(`Password don't match`)).not.toBeInTheDocument();
  });
});
