import { useState } from "react";
import { HiXMark, HiQuestionMarkCircle } from "react-icons/hi2";

const HelpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: "Ctrl+N / Cmd+N", action: "Create new task" },
    { key: "Ctrl+Z / Cmd+Z", action: "Undo action" },
    { key: "Ctrl+Shift+Z / Cmd+Shift+Z", action: "Redo action" },
    { key: "Escape", action: "Clear search query" },
    { key: "Click Edit (✏️)", action: "Edit task details" },
    { key: "Drag & Drop", action: "Move task between columns" },
  ];

  const features = [
    {
      title: "Task Priority",
      desc: "🔴 High, 🟡 Medium, 🟢 Low - Set priority when creating tasks",
    },
    {
      title: "Due Dates",
      desc: "Set deadlines and get warnings for overdue tasks",
    },
    {
      title: "Task Descriptions",
      desc: "Add detailed descriptions and notes to tasks",
    },
    {
      title: "Search & Filter",
      desc: "Quickly find tasks by name or filter by priority",
    },
    {
      title: "Export/Import",
      desc: "Backup your board or import tasks from JSON files",
    },
    {
      title: "Dark Mode",
      desc: "Toggle dark mode with the 🌓 button",
    },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-smooth active:scale-95 z-40"
        title="Help & Tips"
        aria-label="Open help modal"
      >
        <HiQuestionMarkCircle className="text-2xl" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">💡 Help & Tips</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl hover:scale-110 transition-smooth"
            aria-label="Close help modal"
          >
            <HiXMark />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Keyboard Shortcuts */}
          <section>
            <h3 className="text-xl font-bold dark:text-white mb-4">⌨️ Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shortcuts.map((shortcut, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <p className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                    {shortcut.key}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {shortcut.action}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-xl font-bold dark:text-white mb-4">✨ Features</h3>
            <div className="space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section>
            <h3 className="text-xl font-bold dark:text-white mb-4">💡 Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✅ All data is saved locally in your browser</li>
              <li>✅ Use the statistics dashboard to track progress</li>
              <li>✅ Export your tasks regularly for backup</li>
              <li>✅ Red border on task cards = overdue</li>
              <li>✅ Use Undo/Redo to fix mistakes quickly</li>
              <li>✅ Mobile optimization: Use "Desktop Site" option on mobile</li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 sticky bottom-0">
          <button
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full"
          >
            Got it, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
