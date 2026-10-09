export default function TaskFilters({ filters, setFilters }) {
  const update = (key, value) => setFilters({ ...filters, [key]: value });

  return (
    <div className="filters">
      <input
        placeholder="🔍 Search tasks..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="filter-search"
      />
      <select
        value={filters.status}
        onChange={(e) => update("status", e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="pending">⏳ Pending</option>
        <option value="in-progress">🔄 In Progress</option>
        <option value="completed">✅ Completed</option>
      </select>
      <select
        value={filters.priority}
        onChange={(e) => update("priority", e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select
        value={filters.sort}
        onChange={(e) => update("sort", e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority">By Priority</option>
        <option value="title">By Title (A–Z)</option>
      </select>
    </div>
  );
}
