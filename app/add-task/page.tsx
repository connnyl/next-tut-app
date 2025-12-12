"use client";

import { AiOutlineArrowLeft } from "react-icons/ai";
import AddTaskForm from "../components/AddTaskForm";
import { useRouter } from "next/navigation";

export default function AddTaskPage() {
  const router = useRouter();

  return (
    <main className="max-w-4xl mx-auto mt-10">
      <div className="text-center my-5 flex flex-col gap-4">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="btn btn-ghost self-start flex items-center gap-2"
        >
          <AiOutlineArrowLeft size={18} />
          Cancel
        </button>
        
        <h1 className="text-2xl font-bold">Add new task</h1>
        <AddTaskForm />
      </div>
    </main>
  )
}