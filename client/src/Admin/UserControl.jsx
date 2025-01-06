import React, { useEffect, useState } from "react";
import axios from "axios";

const UserControlPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await axios.get("/server/user/allusers", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
          },
        });

        console.log("API Response:", response.data); // Log the API response

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("API response is not an array:", response.data);
          setUsers([]); // Set users to an empty array if the response is invalid
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
        setUsers([]); // Set users to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDeleteUser  = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.delete(
        `/server/user/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  // Display loading state
  if (loading) {
    return <div className="p-6 bg-gray-900 text-white">Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div className="p-6 bg-gray-900 text-white">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">User  Control</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-700">ID</th>
              <th className="px-4 py-2 border border-gray-700">Name</th>
              <th className="px-4 py-2 border border-gray-700">Email</th>
              <th className="px-4 py-2 border border-gray-700">Role</th>
              <th className="px-4 py-2 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border border-gray-700">{user._id}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.username}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.role || "User "}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    <button
                      onClick={() => handleDeleteUser (user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan 
                ="5" className="px-4 py-2 border border-gray-700 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserControlPage;