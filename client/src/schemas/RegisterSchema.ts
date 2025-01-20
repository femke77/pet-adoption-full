import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
  password: z.string().min(1, 'Please provide a password to login.'),
  first_name: z.string().min(1, 'Please provide a first name.'),
  last_name: z.string().min(1, 'Please provide a last name.'),
  username: z.string().min(1, 'Please provide a username.'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export default registerSchema;
