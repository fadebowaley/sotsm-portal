'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRegister } from '@/hooks/useRegister';
import { SubmitHandler } from 'react-hook-form';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { useMedia } from '@core/hooks/use-media';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema } from '@/validators/signup.schema';

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
  isAgreed: false,
};

export default function RegisterForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const { registerUser, loading, error } = useRegister();
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    await registerUser(data);
    setReset({ ...initialValues, isAgreed: false });
  };

  return (
    <>
      <Form<SignUpSchema> resetValues={reset} onSubmit={onSubmit}>
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="flex space-x-6">
              <Input
                type="text"
                label="First Name"
                placeholder="First Name"
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="Last Name"
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your Email Address"
              rounded="pill"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              rounded="pill"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Re-enter password"
              rounded="pill"
              className="mb-4"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <div className="flex items-start pb-2 text-gray-700">
              <Checkbox {...register('isAgreed')} variant="flat" />
              <p className="-mt-0.5 ps-2 text-sm leading-relaxed">
                By signing up you agree to our{' '}
                <Link href="#" className="font-semibold text-blue hover:text-gray-1000">
                  Terms
                </Link>{' '}
                &{' '}
                <Link href="#" className="font-semibold text-blue hover:text-gray-1000">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              className="border-primary-light w-full border-2 text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Already have an account?{' '}
        <Link href={routes.signIn} className="font-semibold text-gray-700 hover:text-blue">
          Sign In
        </Link>
      </Text>
    </>
  );
}
