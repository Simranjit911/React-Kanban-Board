import React, { useState, useContext } from "react";
import { HiSparkles, HiMagnifyingGlass, HiXMark, HiEllipsisVertical } from "react-icons/hi2";
import { Context } from "../Context";
import toast from "react-hot-toast";

const Header = () => {
  const { searchQuery, setSearchQuery, filterPriority, setFilterPriority, tasks, settasks } = useContext(Context);
  const [showFilters, setShowFilters] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = () => {
    if (tasks.length === 0) {
      toast.error("No tasks to export!");
      return;
    }

    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kanban-board-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Tasks exported successfully!");
    setShowMenu(false);
  };

  const handleImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result);
          if (!Array.isArray(imported)) {
            toast.error("Invalid file format! Expected an array of tasks.");
            return;
          }
          settasks(imported);
          localStorage.setItem("tasks", JSON.stringify(imported));
          toast.success(`Imported ${imported.length} tasks!`);
        } catch (error) {
          toast.error("Failed to import tasks. Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    };
    fileInput.click();
    setShowMenu(false);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks? This cannot be undone.")) {
      settasks([]);
      localStorage.setItem("tasks", JSON.stringify([]));
      toast.success("All tasks cleared!");
      setShowMenu(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white shadow-2xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-2 right-4 w-32 h-32 bg-white rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-2 left-4 w-24 h-24 bg-yellow-300 rounded-full filter blur-2xl opacity-20 animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Top Section - Title & Menu */}
      <div className="relative z-10 px-4 py-4">
        <div className="flex justify-between items-center gap-4 mb-3">
          <div className="flex-1 flex items-center gap-3">
            <span className="text-3xl animate-bounce-subtle">📊</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg">Kanban Board</h1>
              <p className="text-blue-100 text-xs flex items-center gap-2">
                <HiSparkles className="inline" />
                Organize • Drag & drop • Manage
              </p>
            </div>
          </div>

          {/* Three Dots Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2.5 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-smooth active:scale-95"
              title="Menu"
              aria-label="Open menu"
            >
              <HiEllipsisVertical className="text-2xl" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-20 min-w-48 animate-slideInRight overflow-hidden">
                <button
                  onClick={handleExport}
                  className="w-full px-4 py-3 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-smooth flex items-center gap-2 border-b border-gray-200 dark:border-gray-700"
                >
                  💾 Export Board
                </button>
                <button
                  onClick={handleImport}
                  className="w-full px-4 py-3 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-smooth flex items-center gap-2 border-b border-gray-200 dark:border-gray-700"
                >
                  📥 Import Board
                </button>
                <button
                  onClick={handleClearAll}
                  className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-smooth flex items-center gap-2 font-medium"
                >
                  🗑️ Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <HiMagnifyingGlass className="absolute left-4 top-3.5 text-white text-lg opacity-70" />
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-12 py-2.5 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 transition-smooth focus:outline-none focus:bg-opacity-30 focus:border-opacity-50 backdrop-blur-sm"
            aria-label="Search tasks"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-white opacity-70 hover:opacity-100 transition-smooth"
              aria-label="Clear search"
            >
              <HiXMark className="text-lg" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-white opacity-90 hover:opacity-100 font-medium transition-smooth mt-2 flex items-center gap-1"
        >
          {showFilters ? "▲ Hide Filters" : "▼ Show Filters"}
        </button>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-3 space-y-2 animate-slideIn pt-3 border-t border-white border-opacity-20">
            <div className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              🎯 Filter by Priority
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All", emoji: "⭕" },
                { value: "high", label: "High", emoji: "🔴" },
                { value: "medium", label: "Medium", emoji: "🟡" },
                { value: "low", label: "Low", emoji: "🟢" },
              ].map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => setFilterPriority(value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${
                    filterPriority === value
                      ? "bg-white text-purple-600 shadow-lg scale-110"
                      : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                  }`}
                  aria-pressed={filterPriority === value}
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
    </div>
  );
};

export default Header;
