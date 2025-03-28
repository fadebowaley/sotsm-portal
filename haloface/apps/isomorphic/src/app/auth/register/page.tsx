import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import RegisterForm from './Register-Form';
// import { metaObject } from '@/config/site.config';

// export const metadata = {
//   ...metaObject('Sign Up 2'),
// };

export default function SignUpPage() {
  return (
    <AuthWrapper title="Register Now!" isSocialLoginActive={true}>
      <RegisterForm />
    </AuthWrapper>
  );
}
