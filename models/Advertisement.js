const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
    used: {
      type: Boolean,
      required: true
    },
    sold: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    images: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'AdvertisementImage' }
    ]
  },
  {
    timestamps: true
  }
);

const Advertisement = mongoose.model('Advertisement', AdvertisementSchema);
module.exports = Advertisement;
