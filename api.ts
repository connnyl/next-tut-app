import { taskIdSchema, tasksSchema } from "./lib/schemas";
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

    if (!res.ok) {
        throw new Error(await getErrorMessage(res));
    }

    const body = await res.json();

    const todosParse = tasksSchema.safeParse(body);
    if (!todosParse.success) {
        throw new Error("Invalid data received from server");
    }
    return todosParse.data;
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

    const newTodo = taskIdSchema.safeParse(body);
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

    if (!res.ok) {
        throw new Error(await getErrorMessage(res));
    }

    const body = await res.json();
    
    const updatedTodo = taskIdSchema.safeParse(body);
    if (!updatedTodo.success) {
        throw new Error("Invalid data received from server");
    }

    return updatedTodo.data;
}

export const deleteTodo = async (id: string): Promise<void> => {
    const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(await getErrorMessage(res));
    }
}