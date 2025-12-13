import { ITask } from "@/types/tasks";
import Task from "./Task"
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";

interface TodoListProps {
  task: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ task }) => {
  return (
    <div className="overflow-x-auto">
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {task.map((task) => <Task key={task.id} task={task} />)}
            </TableBody>
        </Table>
    </div>
  )
}

export default TodoList