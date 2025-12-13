"use client";

import { addTodo } from "@/api";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";

const AddTaskForm = () => {
    const router = useRouter();
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
        }
        );
        setNewTaskValue("");
        router.push("/")
    }

    return (
        <form onSubmit={handleSubmitNewTodo} className="mx-auto w-full max-w-md">
            <div className="flex justify-end items-center gap-2">
                <input value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input w-full" />
                <Button type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default AddTaskForm