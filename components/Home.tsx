import React from "react";
import Slider from "./Slider";

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <nav className="bg-slate-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-between">
      {/* Logo or Title */}
      <div className="text-xl font-bold"><span className="text-sky-400 text-2xl">Welcome to Dashboard</span></div>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full shadow-inner px-3 py-1">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-800 px-2 w-48"
        />
        <button className="text-gray-600 hover:text-blue-500">
          🔍
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">John Doe</span>
        <img
          src="https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png"
          alt="Profile"
          className="rounded-full w-10 h-10 border-2 border-white shadow-md"
        />
      </div>
    </nav>
     <br/>
     <Slider/>
    </div>
  );
};

export default Home;
