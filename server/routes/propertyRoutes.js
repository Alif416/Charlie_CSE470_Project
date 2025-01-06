import express from "express";
import Property from "../models/property.js"; // Ensure the file extension is included

const router = express.Router();

// Add a property
router.post("/add", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      image,
      renterType,
      availableMonth,
      availableYear,
      phoneNumber,
      email,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !image ||
      !renterType ||
      !availableMonth ||
      !availableYear ||
      !phoneNumber ||
      !email
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new property
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      image,
      renterType,
      availableMonth,
      availableYear,
      phoneNumber,
      email,
    });

    // Save the property to the database
    await newProperty.save();

    // Respond with success
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a property
router.put("/update/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      image,
      renterType,
      availableMonth,
      availableYear,
      phoneNumber,
      email,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !image ||
      !renterType ||
      !availableMonth ||
      !availableYear ||
      !phoneNumber ||
      !email
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        location,
        image,
        renterType,
        availableMonth,
        availableYear,
        phoneNumber,
        email,
      },
      { new: true, runValidators: true } // Add runValidators to validate updates
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a property
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all properties
router.get("/all", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Fetch total number of properties
router.get("/total/properties", async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    res.json({ total: totalProperties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example route to fetch bids for properties created by the user


export default router;