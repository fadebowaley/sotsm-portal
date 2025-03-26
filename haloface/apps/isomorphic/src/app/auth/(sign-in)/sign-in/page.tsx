import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import SignInForm from './sign-in-form';
//import { metaObject } from '@/config/site.config';
// export const metadata = {
//   ...metaObject('Sign In 2'),
// };

export default function SignIn() {
  return (
    <AuthWrapper title="Sign In" isSignIn isSocialLoginActive={true}>
      <SignInForm />
    </AuthWrapper>
  );
}
