import { useTodoContext } from "@/context/TodoContext";
import { TodoPayload } from "@/types/todo";
import { useEffect, useState } from "react";

const initialForm: TodoPayload = {
  title: "",
  content: "",
  priority: 1,
  is_done: false,
};

export default function TodoForm() {
  const { editingTodo, handleSubmit, handleCloseModal, loading } =
    useTodoContext();
  const [form, setForm] = useState<TodoPayload>(initialForm);
  const isEditing = editingTodo !== null;

  useEffect(() => {
    if (editingTodo) {
      const { title, content, priority, is_done } = editingTodo;
      setForm({ title, content, priority, is_done });
    } else {
      setForm(initialForm);
    }
  }, [editingTodo]);

  function handleChange(
    field: keyof TodoPayload,
    value: string | number | boolean,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    await handleSubmit(form);
    if (!isEditing) setForm(initialForm);
  }

  return (
    <form onSubmit={formSubmit} className="space-y-5">
      <input
        type="text"
        placeholder="Enter todo title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      />

      <textarea
        placeholder="Enter todo description"
        value={form.content}
        onChange={(e) => handleChange("content", e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      />

      <input
        type="number"
        min={1}
        value={form.priority}
        onChange={(e) => handleChange("priority", e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.is_done}
          onChange={(e) => handleChange("is_done", e.target.value)}
        />
        Mark as completed
      </label>

      <div className="flex gap3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
        >
          {loading ? "Saving..." : isEditing ? "Update Todo" : "Create Todo"}
        </button>
        <button type="button" 
          onClick={handleCloseModal}
          disabled={loading}
          className="rounded-xl border px-5 py-3">
            cancle
          </button>
      </div>
    </form>
  );
}
