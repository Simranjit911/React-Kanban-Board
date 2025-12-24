import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const TaskEditModal = ({ task, isOpen, onClose }) => {
  const { tasks, settasks } = useContext(Context);
  const [editTask, setEditTask] = useState(task || {});

  useEffect(() => {
    setEditTask(task || {});
  }, [task, isOpen]);

  const handleSave = () => {
    if (!editTask.name || editTask.name.trim().length < 3) {
      toast.error("Task name must be at least 3 characters");
      return;
    }

    const updatedTasks = tasks.map(t =>
      t.id === editTask.id ? editTask : t
    );
    settasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task updated successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-slideIn border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ✏️ Edit Task
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-smooth text-xl hover:scale-110 active:scale-95"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={editTask.name || ""}
              onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
              className="input-field"
              placeholder="Enter task name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={editTask.description || ""}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              className="input-field resize-none h-24"
              placeholder="Add task description"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={editTask.priority || "medium"}
              onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
              className="input-field"
            >
              <option value="low">Low 🟢</option>
              <option value="medium">Medium 🟡</option>
              <option value="high">High 🔴</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={editTask.dueDate || ""}
              onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
              className="input-field"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={editTask.status || "todo"}
              onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
              className="input-field"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
