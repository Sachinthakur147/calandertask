import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import Table from "../components/Table";
import Calendar from "../components/Calander";

const IndexPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("home");

  const renderPage = () => {
    switch (selectedPage) {
      case "home":
        return <Home />;
      case "table":
        return <Table />;
      case "calendar":
        return <Calendar />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={setSelectedPage} />
      <div style={{ padding: "20px", flex: 1 }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default IndexPage;
