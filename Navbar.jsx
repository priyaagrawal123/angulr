// src/components/Navbar.js

import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleAuthorsClick = () => {
    navigate("/manageauthors");
  };

  const handleBooksClick = () => {
    navigate("/managebooks");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold"><a href="/">Library Management</a></h1>
        <div className="space-x-4">
          <button
            onClick={handleAuthorsClick}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            Manage Authors
          </button>
          <button
            onClick={handleBooksClick}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200"
          >
            Manage Books
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
