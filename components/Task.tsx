"use client";

import { ITask } from "@/lib/tasks"
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../lib/schemas";
import type { FormValues } from "../lib/schemas";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            task: task.text,
            description: task.description || "",
        },
    });

    useEffect(() => {
        if (isEditOpen) {
        reset({
            task: task.text,
            description: task.description ?? "",
        });
        clearErrors();
        }
    }, [isEditOpen, reset, clearErrors, task.text, task.description]);

    const taskValue = watch("task", "");

    const onSubmitEdit = async (data: FormValues) => {
        try {
            clearErrors("root");

            await editTodo({
                id: task.id,
                text: data.task.trim(),
                description: data.description?.trim() || undefined,
            });

            setIsEditOpen(false);
            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Server error";
            setError("root", { type: "server", message });
        }
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setIsDeleteOpen(false);
        router.refresh();
    }

    return (
        <TableRow key={task.id}>
            <TableCell>{task.text}</TableCell>
            <TableCell>{task.description ?? "-"}</TableCell>
            <TableCell className="flex gap-5">
                <FiEdit
                  onClick={() => setIsEditOpen(true)}
                  className="text-blue-500 cursor-pointer"
                  size={25}
                />

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit task</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmitEdit)}>
                            <div className="mb-4">
                                <Input
                                    {...register("task")}
                                    id={`edit-task-${task.id}`}
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full mb-3"
                                    aria-label="Edit task"
                                />

                                <Textarea
                                    {...register("description")}
                                    id={`edit-desc-${task.id}`}
                                    placeholder="Edit description (optional)"
                                    className="w-full mb-3 min-h-[80px] resize-none"
                                    aria-label="Edit description"
                                />

                                {errors.task && <p className="bg-red-100 text-red-500 mt-4 py-2 px-4 rounded">{errors.task.message}</p>}
                                {errors.description && <p className="bg-red-100 text-red-500 mt-2 py-2 px-4 rounded">{errors.description.message}</p>}
                                {errors.root?.message && <p className="bg-red-100 text-red-500 mt-4 py-2 px-4 rounded">{errors.root.message}</p>}
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary" onClick={() => setIsEditOpen(false)} className="cursor-pointer">Cancel</Button>
                                </DialogClose>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || taskValue.trim() === ""}
                                    className={isSubmitting || taskValue.trim() === "" ? "cursor-not-allowed" : "cursor-pointer"}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <FiTrash2
                  onClick={() => setIsDeleteOpen(true)}
                  className="text-red-500 cursor-pointer"
                  size={25}
                />
                
                <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete task</DialogTitle>
                        </DialogHeader>

                        <p>Are you sure you want to delete this task?</p>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" onClick={() => setIsDeleteOpen(false)} className="cursor-pointer">Cancel</Button>
                            </DialogClose>

                            <Button type="button" variant="destructive" onClick={() => handleDeleteTask(task.id)} className="cursor-pointer">Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}

export default Task
