'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAgreed?: boolean;
}

interface ApiResponse {
  message?: string;
  success?: boolean;
  error?: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const registerUser = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          password: data.password,
          isOwner: true, 
        }),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Something went wrong!');
      }
      alert("Registration successful!, Sign in now!");
      router.push(routes.signIn);
      // console.log('Sign-up successful:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
}
