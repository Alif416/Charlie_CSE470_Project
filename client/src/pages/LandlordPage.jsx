import { useState } from 'react';
import axios from 'axios';
// Ensure this path is correct

function LandlordPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: '',
    renterType: 'bachelor', // Default to 'bachelor'
    availableMonth: '',
    availableYear: '',
    phoneNumber: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.location ||
      !formData.image ||
      !formData.availableMonth ||
      !formData.availableYear ||
      !formData.phoneNumber ||
      !formData.email
    ) {
      setError('All fields are required.');
      return;
    }

    try {
      // Send POST request to the backend
      const response = await axios.post('/server/properties/add', formData);

      // Handle success
      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          image: '',
          renterType: 'bachelor',
          availableMonth: '',
          availableYear: '',
          phoneNumber: '',
          email: '',
        });
        setTimeout(() => setSuccess(false), 3000); // Reset success message after 3 seconds
      }
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || 'Failed to add property. Please try again.');
    }
  };

  return (
    <div className="landlord-page">
      <h1 className="page-title">Add Your Property</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {success && <div className="success-message">Property added successfully!</div>}

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="title">Property Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter property title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter property description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="renterType">Renter Type</label>
          <select
            id="renterType"
            name="renterType"
            value={formData.renterType}
            onChange={handleInputChange}
            required
          >
            <option value="bachelor">Bachelor</option>
            <option value="family">Family</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="availableMonth">Available Month</label>
          <input
            type="number"
            id="availableMonth"
            name="availableMonth"
            placeholder="Available Month (1-12)"
            value={formData.availableMonth}
            onChange={handleInputChange}
            min="1"
            max="12"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableYear">Available Year</label>
          <input
            type="number"
            id="availableYear"
            name="availableYear"
            placeholder="Available Year (e.g., 2025)"
            value={formData.availableYear}
            onChange={handleInputChange}
            min="2023"
            max="2100"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Property</button>
      </form>
    </div>
  );
}

export default LandlordPage;