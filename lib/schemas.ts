import { z } from "zod";

export const newTaskSchema = z.object({
    task: z.string().trim().nonempty("Task cannot be empty"),
    description: z.string().trim().optional()
});

export type FormValues = z.infer<typeof newTaskSchema>;

export const taskSchema = z.object({
  id: z.string(),
  text: z.string(),
  description: z.string().optional(),
});

export type Task = z.infer<typeof taskSchema>;