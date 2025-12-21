"use client";

import { ITask } from "@/lib/tasks"
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const [taskDescToEdit, setTaskDescToEdit] = useState<string>(task.description ?? "");

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const text = taskToEdit.trim();
        if (!text) return;
        await editTodo({
            id: task.id,
            text,
            description: taskDescToEdit.trim() || undefined,
        });
        setIsEditOpen(false);
        router.refresh();
    }

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
                  onClick={() => {setTaskToEdit(task.text); setIsEditOpen(true);}}
                  className="text-blue-500 cursor-pointer"
                  size={25}
                />

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit task</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmitEditTodo}>
                            <div className="mb-4">
                                <Input
                                    id={`edit-task-${task.id}`}
                                    value={taskToEdit}
                                    onChange={e => setTaskToEdit(e.target.value)}
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full mb-3"
                                    aria-label="Edit task"
                                />

                                <Textarea
                                    id={`edit-desc-${task.id}`}
                                    value={taskDescToEdit}
                                    onChange={e => setTaskDescToEdit(e.target.value)}
                                    placeholder="Edit description (optional)"
                                    className="w-full mb-3 min-h-[80px] resize-none"
                                    aria-label="Edit description"
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary" onClick={() => setIsEditOpen(false)} className="cursor-pointer">Cancel</Button>
                                </DialogClose>
                                
                                <Button type="submit" disabled={taskToEdit.trim() === ""}>Submit</Button>
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
