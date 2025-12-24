import { createContext } from "react";

export const Context = createContext({
  // Tasks
  tasks: [],
  settasks: () => {},
  todos: [],
  settodos: () => {},
  progress: [],
  setprogress: () => {},
  done: [],
  setdone: () => {},
  
  // Task creation
  task: { id: "", name: "", status: "todo", priority: "medium", dueDate: "", description: "" },
  settask: () => {},
  
  // UI
  showmsg: false,
  setshowmsg: () => {},
  
  // Search & Filter
  searchQuery: "",
  setSearchQuery: () => {},
  filterPriority: "all",
  setFilterPriority: () => {},
  
  // Undo/Redo
  canUndo: false,
  canRedo: false,
  undo: () => {},
  redo: () => {},
  
  // Stats
  stats: { total: 0, completed: 0, inProgress: 0, completionRate: 0 },
});