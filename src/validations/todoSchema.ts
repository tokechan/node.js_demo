import { z } from 'zod';

export const createTodoSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    userId: z.number({ invalid_type_error: 'userID must be a number'})
    .int()
    .positive({ message: 'Valid userID is required' }),
});

export const updateTodoSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    completed: z.boolean().optional(),
});


export const todoIdParamSchema = z.object({
    id: z
      .string()
      .regex(/^\d+$/, { message: 'Invalid ID format' })
      .transform(Number),
  });
  