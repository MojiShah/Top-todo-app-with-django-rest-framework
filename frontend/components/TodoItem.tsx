import { useTodoContext } from "@/context/TodoContext";
import { Todo } from "@/types/todo";

interface ITodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: ITodoItemProps) {
  const { handleEdit, handleDeleteRequest, handleToggle } = useTodoContext();
  return (
    <div className="rounded-2xl border border-gray-200 bg-white  p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <input
            type="checkbox"
            checked={todo.is_done}
            onChange={() => handleToggle(todo)}
            className="mt-1 h-5 w-5 cursor-pointer"
          />
          <div className="min-w-0 flex-1">
            <h3
              className={`text-lg font-semibold ${todo.is_done ? "text-gray-400 line-through" : "text-gray-900"}`}
            >
              {todo.title}
            </h3>
            <p
              className={`mt-2 text-sm ${todo.is_done ? "text-gray-400" : "text-gray-600"}`}
            >
              {todo.content}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          Priority: {todo.priority}
        </span>
      </div>

      <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => handleEdit(todo)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDeleteRequest(todo.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
