import { useContext, useState } from "react";
import { Context } from "../Context";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const SearchFilter = () => {
  const { searchQuery, setSearchQuery, filterPriority, setFilterPriority } = useContext(Context);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-3 px-2 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
      {/* Search Bar */}
      <div className="relative">
        <HiMagnifyingGlass className="absolute left-3 top-3 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10 py-2.5"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-smooth"
          >
            <HiXMark className="text-lg" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-smooth"
      >
        {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
      </button>

      {/* Filter Options */}
      {showFilters && (
        <div className="space-y-2 animate-slideIn">
          <div>
            <label className="text-sm font-medium dark:text-gray-300 block mb-2">
              Filter by Priority
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
                      ? `${color} ring-2 ring-offset-2 dark:ring-offset-gray-800`
                      : `${color} opacity-50 hover:opacity-100`
                  }`}
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
