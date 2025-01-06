import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyControlPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch properties from the database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/admin/signin"); // Redirect to login page if no token
          return;
        }

        const response = await axios.get("/server/properties/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); // Log the API response

      
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          console.error("API response is not an array:", response.data);
          setProperties([]); // Set properties to an empty array if the response is invalid
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(error.message);
        setProperties([]); // Set properties to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  // Handle property deletion
  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin/signin"); // Redirect to login page if no token
        return;
      }

      const response = await axios.delete(
        `/server/properties/delete/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Remove the deleted property from the state
        setProperties(properties.filter((property) => property._id !== propertyId));
      }
    } catch (error) {
      console.error("Error deleting property:", error);
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
      <h1 className="text-2xl font-bold mb-6">Property Control</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-700">ID</th>
              <th className="px-4 py-2 border border-gray-700">Title</th>
              <th className="px-4 py-2 border border-gray-700">Location</th>
              <th className="px-4 py-2 border border-gray-700">Price</th>
              <th className="px-4 py-2 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(properties) && properties.length > 0 ? (
              properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border border-gray-700">{property._id}</td>
                  <td className="px-4 py-2 border border-gray-700">{property.title}</td>
                  <td className="px-4 py-2 border border-gray-700">{property.location}</td>
                  <td className="px-4 py-2 border border-gray-700">${property.price}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    <button
                      onClick={() => handleDeleteProperty(property._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr> <td colSpan="5" className="px-4 py-2 border border-gray-700 text-center">
                    No properties found.
                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyControlPage;