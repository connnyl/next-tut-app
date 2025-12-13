import { ITask } from "@/types/tasks";
import Task from "./Task"

interface TodoListProps {
  task: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ task }) => {
  return (
    <div className="overflow-x-auto">
        <table className="table w-full">
            <thead>
                <tr>
                    <th>Tasks</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {task.map((task) => <Task key={task.id} task={task} />)}
            </tbody>
        </table>
    </div>
  )
}

export default TodoList