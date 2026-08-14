"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import DeleteTodoModal from "@/components/ui/DeleteTodoModal";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/lib/api";
import { Todo, TodoPayload } from "@/types/todo";

export default function HomePage() {
const [todos, setTodos] = useState<Todo[]>([]);
const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
const [showModal, setShowModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

  async function loadTodos() {
    try {
      setError(null);
      setLoading(true);
      const data = await getTodos();
      setTodos(data);}
    catch (error) {setError(error instanceof Error ? error.message : "Failed to load todos.");}
    finally {setLoading(false)}
  }

  useEffect(() => {loadTodos()}, []);

  function handleCreate() {
    setEditingTodo(null);
    setShowModal(true);
  }

  function handleEdit(todo: Todo) {
    setEditingTodo(todo);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingTodo(null);
  }

  function handleDeleteRequest(id: number) {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return;
  setTodoToDelete(todo);
  setShowDeleteModal(true);
}

function handleCloseDeleteModal() {
  setShowDeleteModal(false);
  setTodoToDelete(null);
}

async function handleSubmit(payload: TodoPayload) {
  try {
    setError(null);
    if (editingTodo) {
      const updatedTodo = await updateTodo(editingTodo.id, payload);
      setTodos((current) =>current.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      .sort((a, b) => a.priority - b.priority));
    } else {
      const newTodo = await createTodo(payload);
      setTodos((current) =>[...current, newTodo].sort((a, b) => a.priority - b.priority));
    }
      handleCloseModal();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Operation failed.");
      throw error;
    }
  }

async function handleDelete() {
  if (!todoToDelete) return;
  try {
    setError(null);
    await deleteTodo(todoToDelete.id);
    setTodos((current) =>current.filter(todo => todo.id !== todoToDelete.id));
    if (editingTodo?.id === todoToDelete.id) {handleCloseModal();}
    handleCloseDeleteModal();
  } catch (error) {setError(error instanceof Error  ? error.message  : "Failed to delete todo.");}
}

  async function handleToggle(todo: Todo) {
    try {
      setError(null);

      const updatedTodo = await updateTodo(todo.id, {title: todo.title,content: todo.content,
        priority: todo.priority,is_done: !todo.is_done,});

      setTodos((current) =>current .map((item) => (item.id === updatedTodo.id ? updatedTodo :
         item)).sort((a, b) => a.priority - b.priority));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update todo.",);
    }
  }

  const completedCount = todos.filter((todo) => todo.is_done).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
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
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm 
              transition hover:bg-indigo-700"
            >
              + New Todo
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Todos</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {todos.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Completed</p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <div>
              <strong>Error:</strong> {error}
            </div>

            <button
              type="button"
              onClick={() => setError(null)}
              className="font-bold text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Todo List */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Todos</h2>

              <p className="mt-1 text-sm text-gray-500">Sorted by priority</p>
            </div>

            <button
              type="button"
              onClick={loadTodos}
              disabled={loading}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-40 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          ) : (
            <TodoList
              todos={todos}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              onToggle={handleToggle}
            />
          )}
        </section>
      </div>

      {/* Todo Modal */}
      <Modal
        show={showModal}
        closeModal={handleCloseModal}
        title={editingTodo ? "Edit Todo" : "Create New Todo"}
      >
        <TodoForm
          todo={editingTodo}
          onSubmit={handleSubmit}
          onCancelEdit={handleCloseModal}
        />
      </Modal>
      {/* Todo Delete Confirmation Modal */}
        <DeleteTodoModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDelete}
        />
    </main>
  );
}
