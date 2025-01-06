// src/components/Dashboard.jsx

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserSuccess } from "../redux/users/userSlice"; // Adjust the import path
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the toggle button

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const handleSignOut = () => {
    dispatch(signOutUserSuccess()); // Clear the user state
    localStorage.removeItem("user"); // Clear local storage (optional)
    navigate("/sign-in"); // Redirect to the sign-in page
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-800 text-white rounded-lg lg:hidden"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative w-64 bg-blue-800 text-white p-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0 z-40`}
      >
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="block p-2 hover:bg-blue-700 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/inbox" className="block p-2 hover:bg-blue-700 rounded">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="block p-2 hover:bg-blue-700 rounded">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/features" className="block p-2 hover:bg-blue-700 rounded">
                Features
              </Link>
            </li>
            <li>
              <Link to="/dashboard/landlord" className="block p-2 hover:bg-blue-700 rounded">
                Landlord
              </Link>
            </li>
            <li>
              <Link to="/dashboard/explore" className="block p-2 hover:bg-blue-700 rounded">
                Explore
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="block w-full text-left p-2 hover:bg-blue-700 rounded"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}