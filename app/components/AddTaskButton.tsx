"use client";

import { AiOutlinePlus } from "react-icons/ai"
import { useRouter } from "next/navigation";

const AddTask = () => {
    const router = useRouter();

    return (
        <button onClick={() => router.push("/add-task")} className="btn btn-primary w-full">Add new task
            <AiOutlinePlus className="ml-2" size={18} />
        </button>
    )
}

export default AddTask