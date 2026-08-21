"use client";

import { useTodoContext } from "@/context/TodoContext";
import TodoItem from "./TodoItem";
import Link from "next/link";

export default function TodoList() {
  const { todos } = useTodoContext();

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-gray-500">No todos found.</p>
        <p className="mt-2 text-sm text-gray-400">Create your first todo.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Link key={todo.id} href={todo.id.toString()}>
          <TodoItem todo={todo} />
        </Link>
      ))}
    </div>
  );
}
