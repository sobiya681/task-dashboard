export default function TaskItem({ task, onDelete, onEdit, onStatusChange }) {
  return (
    <div
      className={`task-item priority-${task.priority} ${task.status === "completed" ? "completed" : ""}`}
    >
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}

        <div className="task-meta">
          <span className={`badge status-${task.status}`}>
            {task.status === "pending" && "⏳"}
            {task.status === "in-progress" && "🔄"}
            {task.status === "completed" && "✅"} {task.status}
          </span>
          <span className={`badge priority-${task.priority}`}>
            {task.priority === "high"}
            {task.priority === "medium"}
            {task.priority === "low"} {task.priority}
          </span>
        </div>
      </div>

      <div className="actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          title="Change status"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button className="btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
