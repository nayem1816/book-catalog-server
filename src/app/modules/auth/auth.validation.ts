import { z } from 'zod';

const signupZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Not a valid email' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Not a valid email' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidation = {
  signupZodSchema,
  loginZodSchema,
};
