import { z } from 'zod';

export const pollSchema = z.object({
  creator: z.string().min(1, "Creator is required"),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string().min(1)).min(2, "At least two options are required"),
}).strict();

export const usernameSchema = z.object({
  username: z.string().min(1, "Username is required"),
}).strict();

export const voteSchema = z.object({
  username: z.string().min(1, "Username is required"),
  optionId: z.number().int().nonnegative("Option ID must be a non-negative integer"),
}).strict();
