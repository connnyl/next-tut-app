"use client";

import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newTaskSchema } from "../lib/schemas";
import type { FormValues } from "../lib/schemas";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const AddTaskForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(newTaskSchema),
    });

    const taskValue = watch("task", "");

    const onSubmitNewTodo = async (data: FormValues) => {
        try {
            await addTodo({
                id: uuidv4(),
                text: data.task.trim(),
                // send undefined if empty so backend stores no description instead of empty string
                description: data.description?.trim() || undefined,
            });
            router.push("/");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Server error";
            setError("root", { type: "server", message });
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmitNewTodo)} className="mx-auto w-full max-w-md">
            <span className="sr-only">New task</span>

            <div>
                <div className="mb-4">
                    <Label htmlFor="task" className="mb-2">Task Name</Label>
                    <Input
                        {...register("task")}
                        id="task"
                        type="text"
                        placeholder="Enter task name"
                        className="w-full"
                        autoFocus
                        aria-label="New task's name"
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="description" className="mb-2">Description</Label>
                    <Textarea
                        {...register("description")}
                        id="description"
                        placeholder="Enter task description"
                        className="w-full min-h-[100px] resize-y"
                        aria-label="New task's description"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting || taskValue.trim() === ""}
                    className={isSubmitting || taskValue.trim() === "" ? "cursor-not-allowed" : "cursor-pointer"}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
            {errors.task && <p className="bg-red-100 text-red-500 mt-4 py-2 px-4 rounded">{errors.task.message}</p>}
            {errors.description && <p className="bg-red-100 text-red-500 mt-2 py-2 px-4 rounded">{errors.description.message}</p>}
        </form>
    )
}

export default AddTaskForm