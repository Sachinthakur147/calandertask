import React, { useState } from "react";
import { FaHome, FaTable, FaCalendarAlt, FaBars, FaChevronRight } from "react-icons/fa";

type SidebarProps = {
  onSelect: (page: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-16" : "w-48"
      } bg-gray-800 text-white flex flex-col transition-all duration-300`}
    >
      <div className="justify-start flex">
      <button
        className="p-2 mb-2 self-center "
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ?  <FaChevronRight className="text-lg" />:<FaBars className="text-lg" />}
      </button>
      </div>
      
      <div
        className="flex items-center cursor-pointer mb-4 px-2 hover:bg-gray-700 rounded-md"
        onClick={() => onSelect("home")}
      >
        <FaHome className="text-lg" />
        {!isCollapsed && <span className="ml-3">Home</span>}
      </div>

      <div
        className="flex items-center cursor-pointer mb-4 px-2 hover:bg-gray-700 rounded-md"
        onClick={() => onSelect("table")}
      >
        <FaTable className="text-lg" />
        {!isCollapsed && <span className="ml-3">Table</span>}
      </div>

      <div
        className="flex items-center cursor-pointer mb-4 px-2 hover:bg-gray-700 rounded-md"
        onClick={() => onSelect("calendar")}
      >
        <FaCalendarAlt className="text-lg" />
        {!isCollapsed && <span className="ml-3">Calendar</span>}
      </div>
    </div>
  );
};

export default Sidebar;
