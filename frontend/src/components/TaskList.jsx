import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onEdit, onStatusChange }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <div className="icon">📭</div>
        <h3>No tasks yet</h3>
        <p>Add your first task using the form above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t._id}
          task={t}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
