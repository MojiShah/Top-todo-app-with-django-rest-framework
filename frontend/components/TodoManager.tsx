"use client";

import { useTodoContext } from "@/context/TodoContext";
import Modal from "./ui/Modal";
import TodoForm from "./TodoForm";

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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"></div>
      <Modal 
        show = {showModal}
        closeModal={handleCloseModal}
        title={editingTodo ? "Edit Todo":"Create New Todo"}
      >
        <h2></h2>
      </Modal>
    </main>
  );
}
