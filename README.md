# 📊 Advanced React Kanban Board

A modern, fully-featured task management application built with React featuring drag-and-drop functionality, real-time updates, and extensive customization options.

![React](https://img.shields.io/badge/React-18.2+-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-06b6d4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-4.4+-646cff?logo=vite)

---

## ✨ Features

### Core Features
- **📋 Task Management**: Create, edit, delete, and organize tasks seamlessly
- **🎯 Drag & Drop**: Intuitive drag-and-drop interface to move tasks between columns
- **💾 Local Storage**: All data persists in your browser (no server needed)
- **🌙 Dark Mode**: Toggle between light and dark themes with smooth transitions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Advanced Features

#### Task Management
- ✅ **Task Priorities**: Set priority levels (High 🔴, Medium 🟡, Low 🟢)
- 📅 **Due Dates**: Add deadlines with overdue warnings
- 📝 **Descriptions**: Add detailed notes to tasks
- ✏️ **Edit Anytime**: Modify task details at any time

#### Search & Organization
- 🔍 **Search**: Real-time task search by name
- 🎚️ **Filter by Priority**: Quickly find high, medium, or low priority tasks
- 📊 **Progress Tracking**: Visual statistics dashboard showing:
  - Total tasks count
  - Completion rate (%)
  - Tasks in each column (To Do, In Progress, Done)

#### Productivity Tools
- ⏮️ **Undo/Redo**: Full history management with keyboard shortcuts
- 💾 **Export/Import**: Backup your board as JSON or import from backup files
- 🗑️ **Clear All**: Bulk delete all tasks (with confirmation)

#### User Experience
- 📎 **Keyboard Shortcuts**:
  - `Ctrl+N` - Create new task (focus input)
  - `Ctrl+Z` - Undo action
  - `Ctrl+Shift+Z` - Redo action
  - `Escape` - Clear search query
- 💡 **Help Modal**: In-app tutorial with features and tips
- ♿ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- 🎉 **Toast Notifications**: Real-time feedback for all actions
- 🎨 **Modern UI**: Gradient backgrounds, smooth animations, glass-morphism effects

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd React-Kanban-Board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AccessibilityEnhancer.jsx      # Accessibility improvements
│   ├── CelebrationRenderer.jsx         # Confetti animations
│   ├── Createtask.jsx                 # Task creation form
│   ├── DarkModeComponent.jsx           # Dark mode toggle
│   ├── DialogBox.jsx                  # Mobile warning
│   ├── ExportImport.jsx               # Backup/restore functionality
│   ├── Header.jsx                     # App header
│   ├── HelpModal.jsx                  # Help & tips
│   ├── Listtasks.jsx                  # Kanban board columns
│   ├── SearchFilter.jsx               # Search & filter UI
│   ├── StatsDashboard.jsx             # Statistics display
│   └── TaskEditModal.jsx              # Task editor
├── hooks/
│   ├── useHistory.js                  # Undo/redo hook
│   └── useLocalStorage.js             # localStorage utility
├── App.jsx                            # Main app component
├── Context.jsx                        # React context setup
├── main.jsx                           # Entry point
├── index.css                          # Global styles
└── App.css                            # Component styles
```

---

## 🎮 Usage Guide

### Creating a Task
1. Select priority (🔴 High / 🟡 Medium / 🟢 Low)
2. Type your task name
3. Click "Add" or press Enter
4. (Optional) Edit to add description and due date

### Editing a Task
1. Click the ✏️ button on any task card
2. Modify name, description, priority, due date, or status
3. Click "Save Changes"

### Moving Tasks
- **Drag & Drop**: Click and drag a task to another column
- **Status Dropdown**: Click edit and select a new status

### Searching & Filtering
1. Type in the search box to find tasks
2. Click "Show Filters" to filter by priority
3. Click "Clear Search" or press Escape to reset

### Managing Your Board
- **Undo**: Click ⏮️ or press `Ctrl+Z`
- **Redo**: Click ⏭️ or press `Ctrl+Shift+Z`
- **Export**: Click "Export" to save as JSON file
- **Import**: Click "Import" to load from JSON file
- **Clear All**: Delete all tasks at once (irreversible)

---

## 🎨 Customization

### Color Scheme
Edit the CSS variables in [src/index.css](src/index.css):
```css
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}
```

### Dark Mode
The app uses Tailwind's `dark:` prefix. Configure in [tailwind.config.js](tailwind.config.js).

---

## 🛠️ Technologies Used

- **React 18.2**: UI library
- **Vite 4.4**: Build tool & dev server
- **Tailwind CSS 3.3**: Utility-first CSS framework
- **React DnD**: Drag and drop functionality
- **React Hot Toast**: Toast notifications
- **React Icons**: Icon library
- **Darkmode JS**: Dark mode implementation
- **UUID**: Unique ID generation

---

## 📊 Data Structure

Tasks are stored in localStorage with the following structure:
```javascript
{
  id: "unique-uuid",
  name: "Task name",
  description: "Task description",
  status: "todo" | "inprogress" | "done",
  priority: "low" | "medium" | "high",
  dueDate: "2024-01-15",
  createdAt: "2024-01-10T10:30:00Z"
}
```

---

## 🎯 Keyboard Shortcuts Cheat Sheet

| Shortcut | Action |
|----------|--------|
| `Ctrl+N` / `Cmd+N` | Create new task |
| `Ctrl+Z` / `Cmd+Z` | Undo |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo |
| `Escape` | Clear search |

---

## 💡 Pro Tips

- 📌 **Backup Regularly**: Use Export to save your board as JSON
- 🎯 **Use Priority**: Color-code your tasks by priority for quick scanning
- 📅 **Set Deadlines**: Due dates help track urgent tasks
- 🔍 **Search Efficiently**: Use search + filter together for precise results
- 💾 **Auto-Save**: Every change is saved automatically to localStorage
- 🌙 **Dark Mode**: Easy on the eyes for evening work sessions

---

## 🐛 Troubleshooting

### Tasks not saving?
- Check if localStorage is enabled in your browser
- Clear browser cache and reload
- Try exporting and re-importing data

### Dark mode not working?
- Click the 🌓 button in the bottom-left corner
- Check browser dark mode settings
- Disable browser extensions if issues persist

### Drag & drop not working?
- Ensure JavaScript is enabled
- Try using the edit modal instead (click ✏️)
- On mobile: Use "Desktop Site" option from browser menu

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 🎓 Learning Resources

This project demonstrates:
- React Hooks (useState, useEffect, useContext, useCallback)
- Context API for state management
- Drag & Drop with react-dnd
- localStorage API
- Tailwind CSS responsive design
- Component composition
- Event handling
- localStorage persistence

---

## 📞 Support

For issues or questions:
1. Check the Help Modal (❓ button)
2. Review the code comments
3. Check browser console for errors

---

**Made with ❤️ using React & Tailwind CSS**
