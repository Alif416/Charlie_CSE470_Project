import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutAdminSuccess } from "../redux/admins/adminSlice"; // Adjust the import path
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the toggle button

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const handleSignOut = () => {
    dispatch(signOutAdminSuccess()); // Clear the admin state
    localStorage.removeItem("admin"); // Clear local storage (optional)
    navigate("/admin-signin"); // Redirect to the admin sign-in page
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg lg:hidden"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0 z-40`}
      >
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link to="/user-control" className="block p-2 hover:bg-gray-700 rounded">
                User Control
              </Link>
            </li>
            <li>
              <Link to="/property-control" className="block p-2 hover:bg-gray-700 rounded">
                Property Control
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="block p-2 hover:bg-gray-700 rounded">
                Analytics 
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="block w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-900">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}