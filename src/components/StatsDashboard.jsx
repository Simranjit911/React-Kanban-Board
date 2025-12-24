import { useContext } from "react";
import { Context } from "../Context";

const StatsDashboard = () => {
  const { tasks } = useContext(Context);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const inProgress = tasks.filter(t => t.status === "inprogress").length;
  const todo = tasks.filter(t => t.status === "todo").length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: "Total Tasks", value: total, icon: "📋", color: "from-blue-400 to-blue-600" },
    { label: "To Do", value: todo, icon: "📝", color: "from-yellow-400 to-yellow-600" },
    { label: "In Progress", value: inProgress, icon: "⏳", color: "from-purple-400 to-purple-600" },
    { label: "Completed", value: completed, icon: "✅", color: "from-green-400 to-green-600" },
  ];

  return (
    <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md border border-blue-100 dark:border-gray-600">
      <h3 className="text-xs font-bold dark:text-white mb-2 flex items-center gap-1">
        <span className="text-sm">📊</span> Progress
      </h3>
      
      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-2 text-white shadow-sm text-center`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="text-lg">{stat.icon}</div>
            <div className="text-lg font-bold leading-tight">{stat.value}</div>
            <div className="text-xs opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Completion Bar - Compact */}
      <div className="bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-100 dark:border-gray-600">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold dark:text-gray-300">Completion</span>
          <span className="text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
            {completionRate}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
