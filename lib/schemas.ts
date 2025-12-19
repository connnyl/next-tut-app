import { z } from "zod";

export const newTaskSchema = z.object({
    task: z.string().trim().nonempty("Task cannot be empty"),
});

export type FormValues = z.infer<typeof newTaskSchema>;

export const taskSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export type Task = z.infer<typeof taskSchema>;