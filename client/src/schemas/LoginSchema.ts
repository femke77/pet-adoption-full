import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
  password: z.string().min(1, 'Please provide a password to login.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default loginSchema;
