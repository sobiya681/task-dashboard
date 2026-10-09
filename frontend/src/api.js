const BASE = "/api/tasks";

export const getTasks = async () => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const createTask = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
};
