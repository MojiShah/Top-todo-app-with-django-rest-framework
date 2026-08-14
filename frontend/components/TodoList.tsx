"use client";

import TodoItem from "./TodoItem";

import { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
}

export default function TodoList({
  todos,
  onEdit,
  onDelete,
  onToggle,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-gray-500">
          No todos found.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Create your first todo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}