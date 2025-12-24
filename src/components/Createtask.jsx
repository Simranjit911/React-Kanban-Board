import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { v4 as uuidv4 } from "uuid";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";

const Createtask = () => {
  const { task, settask, tasks, settasks } = useContext(Context);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  useEffect(() => {
    settasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("Enter at least 3 characters");
    if (task.name.length > 100)
      return toast.error("Task must not be greater than 100 characters");

    settasks((tasks) => {
      let list = [...tasks, { ...task, createdAt: new Date().toISOString() }];
      localStorage.setItem("tasks", JSON.stringify(list));
      toast.success("✨ Task created successfully!");
      return list;
    });
    settask({
      name: "",
      id: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      description: "",
    });
    setShowPriorityMenu(false);
  }

  const priorityColors = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
  };

  return (
    <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md border border-blue-100 dark:border-gray-600">
      <form
        className="flex gap-1.5 items-center justify-center flex-wrap"
        onSubmit={handleSubmit}
      >
        {/* Priority Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            className="px-2 py-1.5 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg font-medium transition-smooth hover:shadow-lg hover:from-purple-500 hover:to-purple-700 active:scale-95 text-xs"
            title="Select priority"
            aria-label="Task priority selector"
          >
            {priorityColors[task.priority] || "🟡"}
          </button>
          {showPriorityMenu && (
            <div className="absolute top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 animate-slideIn border border-gray-200 dark:border-gray-600 overflow-hidden">
              {Object.entries(priorityColors).map(([priority, emoji]) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => {
                    settask({ ...task, priority });
                    setShowPriorityMenu(false);
                  }}
                  className={`block w-full px-3 py-1.5 text-left capitalize transition-smooth hover:bg-gray-100 dark:hover:bg-gray-700 font-medium text-xs ${
                    task.priority === priority ? "bg-purple-100 dark:bg-purple-900 font-bold text-purple-700 dark:text-purple-300" : ""
                  }`}
                >
                  {emoji} {priority}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Task Input */}
        <input
          type="text"
          className="input-field flex-1 min-w-xs py-1.5 text-sm shadow-md"
          value={task.name}
          placeholder="✍️ Enter a new task..."
          onChange={(e) => {
            settask({ ...task, id: uuidv4(), name: e.target.value });
          }}
          aria-label="Task input"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-lg transition-smooth hover:shadow-lg hover:from-blue-600 hover:to-blue-700 active:scale-95 flex items-center gap-1 font-semibold text-xs"
          title="Create task (Ctrl+N)"
          aria-label="Create new task"
        >
          <IoMdAdd className="text-base" /> Add
        </button>
      </form>
    </div>
  );
};

export default Createtask;
