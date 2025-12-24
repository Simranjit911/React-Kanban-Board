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
    <div className="px-2 py-4">
      <form
        className="flex gap-2 items-center justify-center flex-wrap sm:gap-3"
        onSubmit={handleSubmit}
      >
        {/* Priority Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            className="px-3 py-2.5 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg font-medium transition-smooth hover:shadow-lg active:scale-95 text-sm"
            title="Select priority"
          >
            {priorityColors[task.priority] || "🟡"}
          </button>
          {showPriorityMenu && (
            <div className="absolute top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 animate-slideIn">
              {Object.entries(priorityColors).map(([priority, emoji]) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => {
                    settask({ ...task, priority });
                    setShowPriorityMenu(false);
                  }}
                  className={`block w-full px-4 py-2 text-left capitalize transition-smooth hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    task.priority === priority ? "bg-purple-100 dark:bg-purple-900 font-bold" : ""
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
          className="input-field flex-1 min-w-xs py-2.5"
          value={task.name}
          placeholder="Enter a new task..."
          onChange={(e) => {
            settask({ ...task, id: uuidv4(), name: e.target.value });
          }}
          aria-label="Task input"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary flex items-center gap-2 px-4 py-2.5 font-semibold"
          title="Create task (Ctrl+N)"
        >
          <IoMdAdd className="text-lg" /> Add
        </button>
      </form>
    </div>
  );
};

export default Createtask;
