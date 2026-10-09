import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import StatsBar from "./components/StatsBar";
import TaskFilters from "./components/TaskFilters";
import * as api from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dark mode 
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  // Filters
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    sort: "newest",
  });

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  // Apply dark 
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Load tasks 
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // CREATE + UPDATE
  const handleCreateOrUpdate = async (form) => {
    try {
      if (editing) {
        const updated = await api.updateTask(editing._id, form);
        setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
        setEditing(null);
        toast.success("Task updated successfully!");
      } else {
        const created = await api.createTask(form);
        setTasks([created, ...tasks]);
        toast.success("Task added successfully!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };


  const handleStatusChange = async (id, status) => {
    try {
      const updated = await api.updateTask(id, { status });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
      toast.success(`Status updated to "${status}"`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Apply search + filter + sort
  const visibleTasks = useMemo(() => {
    let result = [...tasks];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q),
      );
    }

    if (filters.status !== "all") {
      result = result.filter((t) => t.status === filters.status);
    }

    if (filters.priority !== "all") {
      result = result.filter((t) => t.priority === filters.priority);
    }

    switch (filters.sort) {
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "priority":
        result.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // newest
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [tasks, filters]);

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Notebook</h1>
          <p>YOUR TASKS, IN ONE PLACE</p>
        </div>
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀ light" : "☾ dark"}
        </button>
      </div>

      <StatsBar tasks={tasks} />

      <TaskForm
        onSubmit={handleCreateOrUpdate}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      <TaskFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="loading">Loading tasks</div>
      ) : (
        <TaskList
          tasks={visibleTasks}
          onDelete={handleDelete}
          onEdit={setEditing}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
