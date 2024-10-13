'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { InputPassword } from '../ui/input-password';

import {
  registerUserPayload,
  registerUserValidationSchema,
} from '@/validation/register.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Reigster = () => {
  const initFormValues = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

  const {
    formState: { errors, isDirty, dirtyFields },
    register,
    handleSubmit,
    watch,
  } = useForm<registerUserPayload>({
    mode: 'onSubmit',
    resolver: zodResolver(registerUserValidationSchema),
    defaultValues: initFormValues,
  });
  const watchedValues = watch(); // Watch all fields in the form

  // Auto-save logic
  useEffect(() => {
    if (isDirty) {
      const saveData = async () => {
        toast('Saving in progress, please wait...');
        try {
          // Simulate saving data (replace with your API call)
          setTimeout(() => {
            toast('✔ Form saved successfully!');
          }, 2000);
        } catch (error) {
          console.error('Save failed:', error);
        }
      };

      const timeoutId = setTimeout(saveData, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(timeoutId); // Clear timeout on component unmount or input change
    }
  }, [watchedValues, isDirty]);

  async function onSubmit(formValues: registerUserPayload) {
    console.log(formValues);
  }

  return (
    <div className="flex min-h-screen flex-row items-center justify-center">
      <div className="w-[400px]">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  placeholder="Firstname"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
              </div>
              <div className="mb-4">
                <Input
                  placeholder="Lastname"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>
              <div className="mb-4">
                <InputPassword
                  placeholder="Password"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
              <div className="mb-4">
                <InputPassword
                  placeholder="Confirm password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button form="register-form">Save</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Reigster;
