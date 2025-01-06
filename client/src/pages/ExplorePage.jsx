import { useState } from 'react';
import axios from 'axios';
import '../index.css'; // Ensure this path is correct

function ExplorePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [renterType, setRenterType] = useState(''); // 'bachelor' or 'family'

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/server/properties/all');
      const allProperties = response.data;

      // Filter properties based on search criteria
      const filteredProperties = allProperties.filter((property) => {
        const matchesMinPrice = minPrice === '' || (property.price && property.price >= parseFloat(minPrice));
        const matchesMaxPrice = maxPrice === '' || (property.price && property.price <= parseFloat(maxPrice));
        const matchesLocation =
          location === '' ||
          (property.location && property.location.toLowerCase().includes(location.toLowerCase()));
        const matchesRenterType =
          renterType === '' ||
          (property.renterType && property.renterType.toLowerCase() === renterType.toLowerCase());

        // Only return properties that match ALL criteria
        return matchesMinPrice && matchesMaxPrice && matchesLocation && matchesRenterType;
      });

      setProperties(filteredProperties);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setError(null); // Reset error state
    fetchProperties();
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="explore-page">
      <h1 className="title">Explore Properties</h1>

      {/* Search Filters */}
      <div className="search-filters">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <select
          value={renterType}
          onChange={(e) => setRenterType(e.target.value)}
          className="search-input"
        >
          <option value="">Select Renter Type</option>
          <option value="bachelor">Bachelor</option>
          <option value="family">Family</option>
        </select>
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Properties Grid */}
      <div className="properties-grid">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.image} alt={property.name} className="property-image" />
              <div className="property-details">
                <h2 className="property-title">{property.name}</h2>
                <p className="property-description">{property.description}</p>
                <p className="property-price"><strong>Price:</strong> ${property.price}</p>
                <p className="property-location"><strong>Location:</strong> {property.location}</p>
                <p className="property-renter-type"><strong>Renter Type:</strong> {property.renterType}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            {loading ? 'Loading...' : 'No properties found. Try adjusting your search filters.'}
          </div>
        )}
      </div>
    </div>

  );
}

export default ExplorePage;