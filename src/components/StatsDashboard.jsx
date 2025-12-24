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
    <div className="px-2 py-3">
      <h3 className="text-sm font-bold dark:text-white mb-3">📊 Progress</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-3 text-white shadow-md animate-slideIn`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Completion Bar */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium dark:text-gray-300">Completion Rate</span>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
