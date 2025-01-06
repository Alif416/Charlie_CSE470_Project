import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/server/user/total/users');
        const propertiesResponse = await axios.get('/server/properties/total/properties');

        setTotalUsers(usersResponse.data.totalUsers);
        setTotalProperties(propertiesResponse.data.totalProperties);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <div>
        <h2>Total Users: {totalUsers}</h2>
        <h2>Total Properties: {totalProperties}</h2>
      </div>
    </div>
  );
};

export default AnalyticsPage;