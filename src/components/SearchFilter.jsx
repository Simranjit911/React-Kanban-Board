import { useContext, useState } from "react";
import { Context } from "../Context";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const SearchFilter = () => {
  const { searchQuery, setSearchQuery, filterPriority, setFilterPriority } = useContext(Context);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-3 px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg border border-blue-200 dark:border-gray-600">
      {/* Search Bar */}
      <div className="relative">
        <HiMagnifyingGlass className="absolute left-4 top-3.5 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-12 py-2.5 shadow-md"
          aria-label="Search tasks"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-smooth active:scale-95"
            aria-label="Clear search"
          >
            <HiXMark className="text-lg" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-smooth hover:scale-105"
      >
        {showFilters ? "▲ Hide Filters" : "▼ Show Filters"}
      </button>

      {/* Filter Options */}
      {showFilters && (
        <div className="space-y-3 animate-slideIn pt-2 border-t border-blue-200 dark:border-gray-600">
          <div>
            <label className="text-sm font-bold dark:text-gray-200 block mb-3">
              🎯 Filter by Priority
            </label>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All", color: "bg-gray-200 dark:bg-gray-600" },
                { value: "high", label: "High 🔴", color: "bg-red-200 dark:bg-red-900" },
                { value: "medium", label: "Medium 🟡", color: "bg-yellow-200 dark:bg-yellow-900" },
                { value: "low", label: "Low 🟢", color: "bg-green-200 dark:bg-green-900" },
              ].map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setFilterPriority(value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                    filterPriority === value
                      ? `${color} ring-2 ring-offset-2 dark:ring-offset-gray-800 scale-105 shadow-md`
                      : `${color} opacity-60 hover:opacity-100`
                  }`}
                  aria-pressed={filterPriority === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
