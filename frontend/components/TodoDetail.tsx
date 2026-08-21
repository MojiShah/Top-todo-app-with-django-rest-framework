"use client";

import { useTodoContext } from "@/context/TodoContext";
import Modal from "./ui/Modal";
import TodoForm from "./TodoForm";
import DeleteTodoModal from "./ui/DeleteTodoModal";


interface TodoDetailProps {
  id: number;
}

export default function TodoDetail({ id }: TodoDetailProps) {
  const { todos,editingTodo,showModal, handleEdit,handleCloseModal, handleDeleteRequest, handleToggle, loading } =
    useTodoContext();

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-xl font-bold text-red-700">Todo not found.</h1>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className={`text-3xl font-bold ${
              todo.is_done ? "text-gray-400 line-through" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h1>

          <span className="mt-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
            Priority {todo.priority}
          </span>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.is_done}
            onChange={() => handleToggle(todo)}
            disabled={loading}
            className="h-5 w-5 cursor-pointer rounded border-gray-300"
          />

          <span className="text-sm text-gray-600">
            {todo.is_done ? "Completed" : "Not completed"}
          </span>
        </label>
      </div>

      {/* Content */}
      <div className="mt-8 border-t border-gray-100 pt-6">
        <h2 className="text-sm font-semibold text-gray-500">Description</h2>

        <p
          className={`mt-3 whitespace-pre-wrap leading-7 ${
            todo.is_done ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {todo.content}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
        <button
          type="button"
          onClick={() => handleEdit(todo)}
          disabled={loading}
          className="rounded-xl px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => handleDeleteRequest(todo.id)}
          disabled={loading}
          className="rounded-xl px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      <Modal
        show={showModal}
        closeModal={handleCloseModal}
        title={editingTodo ? "Edit Todo" : "Create New Todo"}
      >
        <TodoForm />
      </Modal>

      <DeleteTodoModal />
    </div>
  );
}
