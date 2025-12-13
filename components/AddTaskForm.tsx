"use client";

import { addTodo } from "@/api";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddTaskForm = () => {
    const router = useRouter();
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const text = newTaskValue.trim();
        if (!text) return;
        await addTodo({
            id: uuidv4(),
            text,
        });
        setNewTaskValue("");
        router.push("/");
    }

    return (
        <form onSubmit={handleSubmitNewTodo} className="mx-auto w-full max-w-md">
            <span className="sr-only">New task</span>
            <div className="flex justify-end items-center gap-2">
                <Input
                  id="task"
                  value={newTaskValue}
                  onChange={e => setNewTaskValue(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="w-full"
                  autoFocus
                  aria-label="New task"
                />
                <Button type="submit" disabled={newTaskValue.trim() === ""}>Submit</Button>
            </div>
        </form>
    )
}

export default AddTaskForm