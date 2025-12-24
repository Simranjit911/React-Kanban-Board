import React from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white py-6 shadow-2xl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-4">
          <div className="w-32 h-32 bg-white rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📊 Kanban Board</h1>
          <p className="text-blue-100 text-sm mt-1">Drag, drop & organize your tasks</p>
        </div>
        <div className="text-2xl opacity-80">
          <HiEllipsisVertical />
        </div>
      </div>
    </div>
  );
};

export default Header;
