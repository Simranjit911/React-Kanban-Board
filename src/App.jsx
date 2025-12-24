import { useEffect, useState, useCallback } from "react";
import Createtask from "./components/Createtask";
import toast from "react-hot-toast";
import { Context } from "./Context";
import DialogBox from "./components/DialogBox";
import Listtasks from "./components/Listtasks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Header from "./components/Header";
import DarkModeComponent from "./components/DarkModeComponent";
import SearchFilter from "./components/SearchFilter";
import StatsDashboard from "./components/StatsDashboard";
import ExportImport from "./components/ExportImport";
import HelpModal from "./components/HelpModal";
import AccessibilityEnhancer from "./components/AccessibilityEnhancer";
import CelebrationRenderer, { useTaskCompletion } from "./components/CelebrationRenderer";

const App = () => {
  const [todos, settodos] = useState([]);
  const [progress, setprogress] = useState([]);
  const [done, setdone] = useState([]);
  const [tasks, settasks] = useState([]);
  const [task, settask] = useState({
    id: "",
    name: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    description: "",
  });
  const [showmsg, setshowmsg] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [historyStack, setHistoryStack] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Celebration
  const { celebrateTaskCompletion, confetti, removeConfetti } = useTaskCompletion();

  // Window resize
  const [screenW, setscreenW] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setscreenW(width);
      if (width <= 450) {
        setshowmsg(true);
        setTimeout(() => setshowmsg(false), 15000);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initial load
  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem("tasks")) || [];
    settasks(loaded);
    setHistoryStack([loaded]);
    setHistoryIndex(0);

    if (screenW <= 450) {
      setshowmsg(true);
      const timer = setTimeout(() => setshowmsg(false), 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track history changes
  useEffect(() => {
    if (historyIndex >= 0) {
      const currentHistory = [...historyStack.slice(0, historyIndex + 1), tasks];
      setHistoryStack(currentHistory);
      setHistoryIndex(currentHistory.length - 1);
    }
  }, [tasks]);

  // Undo function
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      settasks(historyStack[newIndex]);
      setHistoryIndex(newIndex);
      toast.success("⏮️ Undo successful!");
    } else {
      toast.error("Nothing to undo!");
    }
  }, [historyIndex, historyStack]);

  // Redo function
  const redo = useCallback(() => {
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      settasks(historyStack[newIndex]);
      setHistoryIndex(newIndex);
      toast.success("⏭️ Redo successful!");
    } else {
      toast.error("Nothing to redo!");
    }
  }, [historyIndex, historyStack]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+N or Cmd+N: Create task
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        const input = document.querySelector('input[placeholder*="Enter"]');
        input?.focus();
        toast("💡 Task input focused. Type your task and press Enter!", {
          icon: "✨",
        });
      }
      // Ctrl+Z or Cmd+Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
      // Ctrl+Shift+Z or Cmd+Shift+Z: Redo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") {
        e.preventDefault();
        redo();
      }
      // Escape: Clear search
      if (e.key === "Escape") {
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;

  const contextValue = {
    task,
    setshowmsg,
    settask,
    tasks,
    settasks,
    todos,
    settodos,
    progress,
    setprogress,
    done,
    setdone,
    showmsg,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < historyStack.length - 1,
    undo,
    redo,
    celebrateTaskCompletion,
  };

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <DarkModeComponent />
      <AccessibilityEnhancer />
      <Context.Provider value={contextValue}>
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 min-h-screen w-screen overflow-x-hidden">
          {showmsg ? (
            <DialogBox />
          ) : (
            <>
              <Header />

              {/* Main Content */}
              <div className="max-w-full px-2 py-4 space-y-4">
                {/* Search and Filter */}
                <div className="max-w-4xl mx-auto">
                  <SearchFilter />
                </div>

                {/* Undo/Redo and Export Controls */}
                <div className="max-w-4xl mx-auto flex flex-wrap gap-2 items-center justify-center">
                  <button
                    onClick={undo}
                    disabled={!contextValue.canUndo}
                    className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo (Ctrl+Z)"
                    aria-label="Undo last action"
                  >
                    ⏮️ Undo
                  </button>
                  <button
                    onClick={redo}
                    disabled={!contextValue.canRedo}
                    className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo (Ctrl+Shift+Z)"
                    aria-label="Redo last undone action"
                  >
                    ⏭️ Redo
                  </button>
                </div>

                {/* Statistics Dashboard */}
                <div className="max-w-4xl mx-auto">
                  <StatsDashboard />
                </div>

                {/* Create Task */}
                <div className="max-w-4xl mx-auto">
                  <Createtask />
                </div>

                {/* Kanban Board */}
                <div className="max-w-full">
                  <Listtasks />
                </div>

                {/* Export/Import */}
                <div className="max-w-4xl mx-auto">
                  <ExportImport />
                </div>
              </div>

              {/* Help Modal */}
              <HelpModal />

              {/* Celebration Particles */}
              <CelebrationRenderer confetti={confetti} onRemove={removeConfetti} />

              {/* Keyboard shortcut hint */}
              <div className="fixed bottom-20 right-4 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg opacity-70 hover:opacity-100 transition-smooth hidden sm:block max-w-xs z-10">
                <p className="text-xs">
                  💡 <strong>Shortcuts:</strong> Ctrl+N (New) • Ctrl+Z (Undo) • Ctrl+Shift+Z (Redo) • Esc (Clear)
                </p>
              </div>
            </>
          )}
        </div>
      </Context.Provider>
    </DndProvider>
  );
};

export default App;
