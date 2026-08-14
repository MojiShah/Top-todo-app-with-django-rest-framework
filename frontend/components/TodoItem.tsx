"use client";

import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
}

export default function TodoItem({
  todo,
  onEdit,
  onDelete,
  onToggle,
}: TodoItemProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <input
            type="checkbox"
            checked={todo.is_done}
            onChange={() =>
              onToggle(todo)
            }
            className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300"
          />

          <div className="min-w-0 flex-1">
            <h3
              className={`text-lg font-semibold ${
                todo.is_done
                  ? "text-gray-400 line-through"
                  : "text-gray-900"
              }`}
            >
              {todo.title}
            </h3>

            <p
              className={`mt-2 text-sm ${
                todo.is_done
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {todo.content}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          Priority {todo.priority}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(todo)}
          className="rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(todo.id)
          }
          className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}