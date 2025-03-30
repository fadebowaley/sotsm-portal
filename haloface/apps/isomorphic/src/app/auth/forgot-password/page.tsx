import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import ForgetPasswordForm from './forgot-password-form';

export default function ForgotPassword() {
  return (
    <AuthWrapper title="Reset your Password">
      <ForgetPasswordForm />
    </AuthWrapper>
  );
}
