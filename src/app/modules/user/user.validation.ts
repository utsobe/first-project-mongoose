import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password cannot exceed 20 characters')
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
