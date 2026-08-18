"use client";

import Modal from "./Modal";
import { useTodoContext } from "@/context/TodoContext";

export default function DeleteTodoModal() {
  const {
    showDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    loading,
  } = useTodoContext();

  return (
    <Modal
      show={showDeleteModal}
      closeModal={handleCloseDeleteModal}
      title="Delete Todo"
    >
      <div className="space-y-6">
        <div>
          <p className="text-lg font-semibold">
            Are you sure you want to delete this todo?
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCloseDeleteModal}
            disabled={loading}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}