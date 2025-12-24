import toast from "react-hot-toast";
import { Context } from "../Context";
import { useContext, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HiTrash, HiPencil } from "react-icons/hi2";
import TaskEditModal from "./TaskEditModal";

const Listtasks = () => {
  const { tasks, todos, settodos, progress, setprogress, done, setdone, searchQuery, filterPriority } =
    useContext(Context);

  useEffect(() => {
    let ftodos = tasks.filter((task) => task.status === "todo");
    let fprogress = tasks.filter((task) => task.status === "inprogress");
    let fdone = tasks.filter((task) => task.status === "done");

    // Apply search filter
    if (searchQuery) {
      ftodos = ftodos.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      fprogress = fprogress.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      fdone = fdone.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Apply priority filter
    if (filterPriority !== "all") {
      ftodos = ftodos.filter(t => t.priority === filterPriority);
      fprogress = fprogress.filter(t => t.priority === filterPriority);
      fdone = fdone.filter(t => t.priority === filterPriority);
    }

    settodos(ftodos);
    setprogress(fprogress);
    setdone(fdone);
  }, [tasks, searchQuery, filterPriority]);

  const statuses = [
    { key: "todo", label: "📝 To Do", color: "from-yellow-400 to-yellow-600" },
    { key: "inprogress", label: "⏳ In Progress", color: "from-purple-400 to-purple-600" },
    { key: "done", label: "✅ Done", color: "from-green-400 to-green-600" },
  ];

  return (
    <div className="flex px-1 my-1 flex-col gap-2 sm:flex-row justify-center items-stretch mx-auto max-w-7xl h-full">
      {statuses.map((status, idx) => (
        <Section key={idx} status={status.key} label={status.label} color={status.color} />
      ))}
    </div>
  );
};

export default Listtasks;

function Section({ status, label, color }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItem(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addItem(id) {
    settasks((prev) => {
      const mtask = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mtask));
      toast.success("✨ Task status updated!");
      return mtask;
    });
  }

  let { settasks, tasks, todos, progress, done } = useContext(Context);
  let tasktomap = todos;
  if (status === "inprogress") {
    tasktomap = progress;
  }
  if (status === "done") {
    tasktomap = done;
  }

  return (
    <div
      ref={drop}
      className={`flex-1 rounded-lg py-2 sm:w-96 pb-3 h-full bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md transition-smooth column-hover overflow-y-auto ${
        isOver ? "ring-4 ring-blue-400 dark:ring-blue-600 scale-105 animate-pulse-glow" : ""
      }`}
    >
      {/* Column Header */}
      <div className={`bg-gradient-to-r ${color} rounded-t-lg py-2 px-3 mb-2 text-white shadow-md`}>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-sm capitalize">{label}</h2>
          <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {tasktomap.length}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="px-2 space-y-1">
        {tasktomap.length === 0 ? (
          <div className="text-center py-4 text-gray-400 dark:text-gray-500">
            <p className="text-xs">No tasks here</p>
          </div>
        ) : (
          tasktomap.map((task) => (
            <SingleTask key={task.id} task={task} tasks={tasks} settasks={settasks} />
          ))
        )}
      </div>
    </div>
  );
}

function SingleTask({ task, tasks, settasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleRemove(id) {
    const newTask = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    settasks(newTask);
    toast.success("🗑️ Task deleted successfully!");
  }

  const priorityEmojis = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

  return (
    <>
      <div
        ref={drag}
        className={`bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm transition-smooth cursor-grab active:cursor-grabbing border-l-4 ${
          task.priority === "high"
            ? "border-red-500"
            : task.priority === "medium"
            ? "border-yellow-500"
            : "border-green-500"
        } ${isDragging ? "opacity-50 scale-95 ring-2 ring-blue-400" : "opacity-100 hover:shadow-md"} ${
          isOverdue ? "ring-2 ring-red-400" : ""
        }`}
      >
        <div className="flex justify-between items-start gap-1.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-sm flex-shrink-0">{priorityEmojis[task.priority || "medium"]}</span>
              <p className="font-medium text-gray-800 dark:text-gray-100 break-words line-clamp-2 text-xs">
                {task.name}
              </p>
            </div>

            {task.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-1">
                {task.description}
              </p>
            )}

            {task.dueDate && (
              <div className={`text-xs ${isOverdue ? "text-red-600 dark:text-red-400 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
                📅 {new Date(task.dueDate).toLocaleDateString()} {isOverdue ? "⚠️" : ""}
              </div>
            )}
          </div>

          <div className="flex gap-0.5 flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-smooth text-xs"
              title="Edit task"
            >
              <HiPencil className="text-sm" />
            </button>
            <button
              onClick={() => handleRemove(task.id)}
              className="p-1.5 rounded-md bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-smooth text-xs"
              title="Delete task"
            >
              <HiTrash className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <TaskEditModal task={task} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
