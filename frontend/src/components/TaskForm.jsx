import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function TaskForm({ onSubmit, editing, onCancel }) {
  const initialForm = {
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        description: editing.description || "",
        status: editing.status,
        priority: editing.priority,
      });
    } else {
      setForm(initialForm);
    }
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    onSubmit(form);
    setForm(initialForm);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editing ? "✏️ Edit Task" : "➕ Add New Task"}</h2>

      <input
        name="title"
        placeholder="Task title *"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
      />

      <div className="form-row">
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🔄 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">{editing ? "Update Task" : "Add Task"}</button>
      </div>

      {editing && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
