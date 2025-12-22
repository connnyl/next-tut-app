import { z } from "zod";

export const taskSchema = z.object({
    task: z.string().trim().nonempty("Task cannot be empty"),
    description: z.string().trim().optional()
});

export type FormValues = z.infer<typeof taskSchema>;

export const taskIdSchema = z.object({
  id: z.string(),
  text: z.string(),
  description: z.string().optional(),
});

export const tasksSchema = z.array(taskIdSchema);

export type Task = z.infer<typeof taskIdSchema>;
export type Tasks = z.infer<typeof tasksSchema>;