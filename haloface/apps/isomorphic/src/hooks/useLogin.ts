'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

interface LoginData {
  email: string;
  password: string;
}

interface ApiResponse {
  message?: string;
  success?: boolean;
  error?: string;
  token?: string; 
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginUser = async (data: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Login failed');
      }

      // Save token to localStorage (or cookies)
      if (result.token) {
        localStorage.setItem('authToken', result.token);
      }
      alert("Login successful! Please Wait...");
      router.push(routes.project.dashboard); 
      // console.log('Login successful:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};