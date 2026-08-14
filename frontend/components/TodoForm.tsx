"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Todo,
  TodoPayload,
} from "@/types/todo";

interface TodoFormProps {
  todo: Todo | null;
  onSubmit: (
    payload: TodoPayload
  ) => Promise<void>;
  onCancelEdit: () => void;
}

const initialForm: TodoPayload = {
  title: "",
  content: "",
  priority: 1,
  is_done: false,
};

export default function TodoForm({
  todo,
  onSubmit,
  onCancelEdit,
}: TodoFormProps) {
  const [form, setForm] =
    useState<TodoPayload>(initialForm);

  const [loading, setLoading] =
    useState(false);

  const isEditing = todo !== null;

  useEffect(() => {
    if (todo) {
      setForm({
        title: todo.title,
        content: todo.content,
        priority: todo.priority,
        is_done: todo.is_done,
      });
    } else {
      setForm(initialForm);
    }
  }, [todo]);

  function handleChange(
    field: keyof TodoPayload,
    value: string | number | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!form.content.trim()) {
      alert("Content is required");
      return;
    }

    if (form.priority < 1) {
      alert("Priority must be at least 1");
      return;
    }

    try {
      setLoading(true);

      await onSubmit(form);

      if (!isEditing) {
        setForm(initialForm);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(event) =>
            handleChange(
              "title",
              event.target.value
            )
          }
          placeholder="Enter todo title"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Content
        </label>

        <textarea
          id="content"
          value={form.content}
          onChange={(event) =>
            handleChange(
              "content",
              event.target.value
            )
          }
          placeholder="Enter todo description"
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Priority */}
      <div>
        <label
          htmlFor="priority"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Priority
        </label>

        <input
          id="priority"
          type="number"
          min={1}
          value={form.priority}
          onChange={(event) =>
            handleChange(
              "priority",
              Number(event.target.value)
            )
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Is Done */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={form.is_done}
          onChange={(event) =>
            handleChange(
              "is_done",
              event.target.checked
            )
          }
          className="h-5 w-5 rounded border-gray-300"
        />

        <span className="text-sm font-medium text-gray-700">
          Mark as completed
        </span>
      </label>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Todo"
            : "Create Todo"}
        </button>

        <button
          type="button"
          onClick={onCancelEdit}
          disabled={loading}
          className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}