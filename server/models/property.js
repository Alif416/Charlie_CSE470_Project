import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  renterType: { type: String, enum: ['bachelor', 'family'], required: true },
  availableMonth: { type: Number, min: 1, max: 12, required: true },
  availableYear: { type: Number, min: 2023, max: 2100, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Check if the phone number is exactly 11 digits
        return /^\d{11}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 11-digit phone number!`,
    },
  },
  email: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});


const Property = mongoose.model('Property', propertySchema);

export default Property;