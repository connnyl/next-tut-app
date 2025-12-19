import { taskSchema } from "./lib/schemas";
import { ITask } from "./lib/tasks"

const baseURL = "http://localhost:3001"

async function getErrorMessage(res: Response) {
  try {
    const data = await res.json();
    if (typeof data?.message === "string") return data.message;
  } catch {}
  return `Request failed (${res.status})`;
}

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseURL}/tasks`, {cache: "no-store"});
    const todos = await res.json();
    return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    if (!res.ok) {
        throw new Error(await getErrorMessage(res));
    }

    const body = await res.json();

    const newTodo = taskSchema.safeParse(body);
    if (!newTodo.success) {
        throw new Error("Invalid data received from server");
    }
    
    return newTodo.data;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}/tasks/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const updatedTodo = await res.json();
    return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseURL}/tasks/${id}`, {
        method: "DELETE",
    });
}