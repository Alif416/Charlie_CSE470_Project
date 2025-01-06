import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'; // Ensure this path is correct

function FeaturesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapVisible, setMapVisible] = useState({}); // Map visibility state
  const [selectedProperty, setSelectedProperty] = useState(null); // Selected property state
  const [iframeSrc, setIframeSrc] = useState({}); // iframe src state

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/server/properties/all');
      setProperties(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (property) => {
    window.location.href = `mailto:${property.email}`;
  };

  const handleLocationClick = async (property) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=Dhaka&format=json&limit=1`);
      const longitude = parseFloat(response.data[0].lon);
      const latitude = parseFloat(response.data[0].lat);

      console.log(`Longitude: ${longitude}`);
      console.log(`Latitude: ${latitude}`);

      // Use the longitude and latitude to display the map
      const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}&markers=icon:marker-red&zoom=15`;
      setIframeSrc((prevIframeSrc) => ({ ...prevIframeSrc, [property.id]: iframeSrc }));
      setSelectedProperty(property);
      setMapVisible((prevMapVisible) => ({ ...prevMapVisible, [property.id]: true }));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="features-page">
      <h1 className="title">Featured Properties</h1>
      <div className="properties-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.name} className="property-image" />
            <div className="property-details">
              <h2 className="property-title">{property.title}</h2>
              <p className="property-description">{property.description}</p>
              <p className="property-price"><strong>Price:</strong> ${property.price}</p>
              <p className="property-location"><strong>Location:</strong> {property.location}</p>
              <p className="property-renter-type"><strong>Renter Type:</strong> {property.renterType}</p>
              <p className="property-available-month"><strong>Available Month:</strong> {property.availableMonth}</p>
              <p className="property-available-year"><strong>Available Year:</strong> {property.availableYear}</p>
              <p className="property-phone-number"><strong>Phone Number:</strong> {property.phoneNumber}</p>
              <p className="property-email"><strong>Email:</strong> {property.email}</p>
              <p className="property-created-date"><strong>Created Date:</strong> {property.createdDate}</p>
              
              {/* Contact Button */}
              <button 
                className="contact-button" 
                onClick={() => handleContactClick(property)}
              >
                Contact
              </button>

              {/* Location Button */}
              <button 
                className="location-button" 
                style={{
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => handleLocationClick(property)}
              >
                View Location
              </button>

              {/* Map */}
              {mapVisible[property.id] && (
                <div className="map-container">
                  <iframe
                    title="OpenStreetMap"
                    src={iframeSrc[property.id]}
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesPage;
