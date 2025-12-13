"use client";

import { AiOutlinePlus } from "react-icons/ai"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

const AddTask = () => {
    const router = useRouter();

    return (
        <Button type="button" onClick={() => router.push("/add-task")} className="w-full">
          Add new task
          <AiOutlinePlus className="ml-2" size={18} />
        </Button>
    )
}

export default AddTask