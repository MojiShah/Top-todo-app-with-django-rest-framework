"use client";

import Modal from "./Modal";

interface DeleteTodoModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteTodoModal({
  show,
  onClose,
  onConfirm,
}: DeleteTodoModalProps) {
  return (
    <Modal
      show={show}
      closeModal={onClose}
      title="Delete Todo"
    >
      <div className="space-y-6">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            Are you sure you want to delete this todo?
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            This action cannot be undone. The todo will be
            permanently deleted.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}