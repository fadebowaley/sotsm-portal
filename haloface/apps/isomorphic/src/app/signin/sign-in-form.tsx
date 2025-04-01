'use client';

import Link from 'next/link';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { useLogin } from '@/app/signin/useLogin';
import { SubmitHandler } from 'react-hook-form';

export default function SignInForm() {
  const { loginUser, loading, error } = useLogin();
  
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    await loginUser(data);
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            
            <div className="flex items-center justify-between pb-2">
              {/* <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              /> */}
              <Link
                href={routes.auth.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            
            {error && (
              <Text className="text-sm text-red-500">{error}</Text>
            )}
            
            <Button 
              className="w-full" 
              type="submit" 
              size="lg"
              disabled={loading}
            >
              <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              {!loading && <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />}
            </Button>
          </div>
        )}
      </Form>
      
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don't have an account?{' '}
        <Link
          href={routes.auth.register}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Register
        </Link>
      </Text>
    </>
  );
}