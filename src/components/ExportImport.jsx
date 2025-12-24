import { useContext, useRef } from "react";
import { Context } from "../Context";
import { HiArrowDownTray, HiArrowUpTray } from "react-icons/hi2";
import toast from "react-hot-toast";

const ExportImport = () => {
  const { tasks, settasks } = useContext(Context);
  const fileInputRef = useRef(null);

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
  };

  const handleImport = (e) => {
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
    fileInputRef.current.value = "";
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks? This cannot be undone.")) {
      settasks([]);
      localStorage.setItem("tasks", JSON.stringify([]));
      toast.success("All tasks cleared!");
    }
  };

  return (
    <div className="flex gap-2 px-2 py-3 flex-wrap">
      <button
        onClick={handleExport}
        className="btn-primary flex items-center gap-2 text-sm"
        title="Download tasks as JSON"
      >
        <HiArrowDownTray /> Export
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="btn-primary flex items-center gap-2 text-sm"
        title="Upload tasks from JSON"
      >
        <HiArrowUpTray /> Import
      </button>

      <button
        onClick={handleClearAll}
        className="btn-danger flex items-center gap-2 text-sm"
        title="Delete all tasks"
      >
        🗑️ Clear All
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
        aria-label="Import tasks file"
      />
    </div>
  );
};

export default ExportImport;
