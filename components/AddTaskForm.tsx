"use client";

import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type FormValues = {
    task: string;
}

const AddTaskForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const taskValue = watch("task", "");

    const onSubmitNewTodo = async (data: FormValues) => {
        await addTodo({
            id: uuidv4(),
            text: data.task.trim(),
        });

        router.push("/");
    }


    return (
        <form onSubmit={handleSubmit(onSubmitNewTodo)} className="mx-auto w-full max-w-md">
            <span className="sr-only">New task</span>

            <div className="flex justify-end items-center gap-2">
                <Input
                    {...register("task", {
                        required: "Task cannot be empty",
                        validate: (v) => v.trim().length > 0 || "Task cannot be empty",
                    })}
                    id="task"
                    type="text"
                    placeholder="Type here"
                    className="w-full"
                    autoFocus
                    aria-label="New task"
                />

                <Button
                    type="submit"
                    disabled={isSubmitting || taskValue.trim() === ""}
                    className={isSubmitting || taskValue.trim() === "" ? "cursor-not-allowed" : "cursor-pointer"}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
            {errors.task && <p className="bg-red-100 text-red-500 mt-4 py-2 px-4 rounded">{errors.task.message}</p>}
        </form>
    )
}

export default AddTaskForm