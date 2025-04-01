'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';

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
  const pathname = usePathname();
  const isMounted = useRef(true);
  const hasNavigated = useRef(false); // Tracks if navigation has occurred

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loginUser = async (data: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include', 
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const result = (await response.json()) as ApiResponse;
          errorMessage = result.message || result.error || errorMessage;
        } catch {
          errorMessage = 'Server error, invalid response';
        }
        throw new Error(errorMessage);
      }

      const result = (await response.json()) as { user: any; tokens: { access: { token: string; expires: string }; refresh: { token: string; expires: string } } };
      
      if (result.tokens?.access?.token && typeof window !== 'undefined') {
        const accessToken = result.tokens.access.token;
        localStorage.setItem('authToken', accessToken);
    }
    
      hasNavigated.current = true; // Mark that navigation is happening
      toast.success('Login successful!, Please Wait...');
      router.push(routes.project.dashboard);
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
      if (hasNavigated.current && pathname === routes.project.dashboard) {
        toast.success('Login successful!');
        hasNavigated.current = false; 
      }
    }, [pathname]);

  return { loginUser, loading, error };
}
