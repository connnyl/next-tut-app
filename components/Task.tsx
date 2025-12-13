"use client";

import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const text = taskToEdit.trim();
        if (!text) return;
        await editTodo({
            id: task.id,
            text,
        });
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTask = async (id: string) => {
        // Call deleteTodo API function
        await deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh();
    }

    return (
        <TableRow key={task.id}>
            <TableCell className="w-full">{task.text}</TableCell>
            <TableCell className="flex gap-5">
                <FiEdit
                  onClick={() => setOpenModalEdit(true)}
                  className="text-blue-500 cursor-pointer"
                  size={25}
                />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit task</h3>
                        <span className="sr-only">Edit task {task.id}</span>
                        <div className="modal-action">
                            <Input
                              id={`edit-task-${task.id}`}
                              value={taskToEdit}
                              onChange={e => setTaskToEdit(e.target.value)}
                              type="text"
                              placeholder="Type here"
                              className="w-full"
                              aria-label="Edit task"
                            />
                            <Button type="submit" disabled={taskToEdit.trim() === ""}>Submit</Button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2
                  onClick={() => setOpenModalDelete(true)}
                  className="text-red-500 cursor-pointer"
                  size={25}
                />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">Are you sure you want to delete this task?</h3>
                    <div className="modal-action">
                        <Button type="button" onClick={() => handleDeleteTask(task.id)}>Yes</Button>
                    </div>
                </Modal>
            </TableCell>
        </TableRow>
    )
}

export default Task
