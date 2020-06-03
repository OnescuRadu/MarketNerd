const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const City = mongoose.model('City', CitySchema);
module.exports = City;
