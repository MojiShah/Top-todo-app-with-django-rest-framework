"use client";

import { useTodoContext } from "@/context/TodoContext";
import Modal from "./ui/Modal";
import TodoForm from "./TodoForm";
import DeleteTodoModal from "./ui/DeleteTodoModal";
import TodoList from "./TodoList";

export default function TodoManager() {
  const {
    todos,
    editingTodo,
    todoToDelete,

    loading,
    error,

    showModal,
    showDeleteModal,

    handleCloseModal,
    handleCloseDeleteModal,

    handleCreate,
    handleEdit,
    handleDeleteRequest,

    handleDelete,
    handleToggle,
    handleSubmit,

    closeError,
  } = useTodoContext();

  const completedCount = todos.filter((todo) => todo.is_done).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Django REST + Next.js
              </p>

              <h1 className="text-4xl font-black tracking-tight text-gray-900">
                Todo Manager
              </h1>

              <p className="mt-3 max-w-xl text-gray-600">
                Manage your todos using a Next.js frontend connected to your
                Django REST API.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
            >
              +new Todo
            </button>

          </div>

        </header>

        <section className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Todos
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {todos.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
        </section>

        {error && (
          <div className="mb-6 flex justify-between rounded-xl border border-red-200 bg-red-50
           px-5 py-4 text-sm text-red-700">

            <div>
              <strong>Error:</strong> {error}
            </div>

            <button
              type="button"
              onClick={closeError}
            >
              ✕
            </button>

          </div>
        )}

        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Todos
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sorted by priority
            </p>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <TodoList />
          )}
        </section>

      </div>
      <Modal
        show={showModal}
        closeModal={handleCloseModal}
        title={editingTodo ? "Edit Todo" : "Create New Todo"}
      >
        <TodoForm />
      </Modal>

      <DeleteTodoModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </main>
  );
}
