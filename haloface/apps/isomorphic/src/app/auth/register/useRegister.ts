'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';

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
  const pathname = usePathname();
  const isMounted = useRef(true);
  const hasNavigated = useRef(false); // Tracks if navigation has occurred

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

      if (!response.ok) {
        let errorMessage = 'Something went wrong!';
        try {
          const result = (await response.json()) as ApiResponse;
          errorMessage = result.message || result.error || errorMessage;
        } catch {
          errorMessage = 'Server error, invalid response';
        }
        throw new Error(errorMessage);
      }

      hasNavigated.current = true; // Mark that navigation is happening
      toast.success("Registration successful!");
      router.push(routes.signIn);
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (hasNavigated.current && pathname === routes.signIn) {
      toast.success("Registration successful!");
      hasNavigated.current = false; // Reset navigation tracking
    }
  }, [pathname]);

  return { registerUser, loading, error };
}
