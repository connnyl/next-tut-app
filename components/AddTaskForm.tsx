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
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const text = newTaskValue.trim();
        if (!text) {
            setError("Please enter a task");
            setIsSubmitting(false);
            return;
        }
        await addTodo({
            id: uuidv4(),
            text,
        });
        setNewTaskValue("");
        setIsSubmitting(false);
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
                <Button type="submit" disabled={newTaskValue.trim() === "" || isSubmitting}>Submit</Button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </form>
    )
}

export default AddTaskForm