'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { useMedia } from '@core/hooks/use-media';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';

const initialValues = {
  email: '',
  password: '',
  isAgreed: false,
};

export default function RegisterForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      const response = await fetch('https://your-backend-api.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          password: data.password,
          email_verified: false,  // Default value (can be updated later via email verification)
          isOwner: true,         // Assuming default is false
          isSuper: true,           // Assuming all sign-ups are users by default
        }),
      });
  
      const result:any = await response.json();
  
      if (!response.ok) {
        console.error('Sign-up error response:', response);
        throw new Error(result.message || 'Something went wrong!');
      }

      window.location.href = routes.signIn;
      console.log('Sign-up successful:', result);
      
      setReset({ ...initialValues, isAgreed: false });
      
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };
  
  return (
    <>
      <Form<SignUpSchema>
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="flex space-x-6">
              <Input
                type="text"
                size={isMedium ? 'md' : 'md'}
                label="FirstName"
                placeholder="FirstName"
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                type="text"
                size={isMedium? 'md' : 'md'}
                label="LastName"
                placeholder="LastName"
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            <Input
              type="email"
              size={isMedium ? 'md' : 'md'}
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
              size={isMedium ? 'md' : 'md'}
              rounded="pill"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Re-enter password"
              size={isMedium ? 'md' : 'md'}
              rounded="pill"
              className="mb-10"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-start pb-2 text-gray-700">
              <Checkbox {...register('isAgreed')} variant="flat" />
              <p className="-mt-0.5 ps-2 text-sm leading-relaxed">
                By signing up you have agreed to our{' '}
                <Link
                  href="#"
                  className="font-semibold text-blue transition-colors hover:text-gray-1000"
                >
                  Terms
                </Link>{' '}
                &{' '}
                <Link
                  href="#"
                  className="font-semibold text-blue transition-colors hover:text-gray-1000"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <Button
              className="border-primary-light w-full border-2 text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
            >
              Create Account
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Already have an account?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
