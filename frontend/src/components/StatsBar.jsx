export default function StatsBar({ tasks }) {
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const cards = [
    { label: "Total", value: stats.total, icon: "📋", color: "stat-total" },
    {
      label: "Pending",
      value: stats.pending,
      icon: "⏳",
      color: "stat-pending",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: "🔄",
      color: "stat-progress",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: "✅",
      color: "stat-completed",
    },
  ];

  return (
    <div className="stats-bar">
      {cards.map((c) => (
        <div key={c.label} className={`stat-card ${c.color}`}>
          <div className="stat-icon">{c.icon}</div>
          <div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
