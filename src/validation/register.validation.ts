import { object, string, z } from 'zod';

export const registerUserValidationSchema = object({
  firstName: string().min(1, { message: 'Firstname is required' }),
  lastName: string().min(1, { message: 'Lastname is required' }),
  password: string().min(1, { message: 'Password is required' }),
  confirmPassword: string().min(1, { message: 'Confirm password is required' }),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: `Password don't match`,
  path: ['confirmPassword'],
});

export type registerUserPayload = z.infer<typeof registerUserValidationSchema>;
