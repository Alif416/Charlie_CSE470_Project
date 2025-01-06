import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: localStorage.getItem("profilePicture") || "https://via.placeholder.com/150", // Default profile picture
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from an API or local storage
    const fetchUserData = async () => {
      // Replace with your API call
      const userData = {
        username: "john_doe",
        email: "john@example.com",
        profilePicture: localStorage.getItem("profilePicture") || "https://via.placeholder.com/150", // Replace with actual URL
      };
      setUser((prevUser) => ({
        ...prevUser,
        ...userData,
      }));
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission to update user information
    console.log("Updated user information:", user);
    // Add your API call to update user information here
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const profilePicture = reader.result;
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture,
      }));
      localStorage.setItem("profilePicture", profilePicture);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/1127344.jpg')" }}>
      <div className="flex flex-col items-center py-10 bg-gray-900 bg-opacity-75 min-h-screen">
        <h1 className="text-4xl font-bold text-center my-7 text-white">Profile</h1>
        <div className="relative mb-5">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
        </div>
        {!isEditing ? (
          <form className="flex flex-col items-center mt-5 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="username" className="text-gray-700 font-bold">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                placeholder="Username"
                className="border border-gray-400 p-2 w-80 my-2 bg-gray-100 rounded"
                disabled
              />
            </div>
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="email" className="text-gray-700 font-bold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                placeholder="Email"
                className="border border-gray-400 p-2 w-80 my-2 bg-gray-100 rounded"
                disabled
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 my-2"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <form className="flex flex-col items-center mt-5 bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="username" className="text-gray-700 font-bold">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
                className="border border-gray-400 p-2 w-80 my-2 bg-gray-100 rounded"
              />
            </div>
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="email" className="text-gray-700 font-bold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-400 p-2 w-80 my-2 bg-gray-100 rounded"
              />
            </div>
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="password" className="text-gray-700 font-bold">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-gray-400 p-2 w-80 my-2 bg-gray-100 rounded"
              />
            </div>
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="confirmPassword" className="text-gray-700 font-bold">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="border border-gray-400 p-2 w-80 my-2 bg-gray-100 rounded"
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 my-2"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}