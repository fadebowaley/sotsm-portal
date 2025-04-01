import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.firstNameRequired }),
  email: validateEmail.min(1, { message: messages.emailIsRequired }),
  password: validatePassword.min(8, { message: messages.passwordRequired }),
  confirmPassword: validateConfirmPassword,
  isAgreed: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms',
  }),
  isOwner: z.boolean(),
  isSuper: z.boolean()
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'], // This ensures the error appears under the confirm password field
})
;

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
