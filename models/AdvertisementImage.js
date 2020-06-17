const mongoose = require('mongoose');

const AdvertisementImageSchema = new mongoose.Schema(
  {
    href: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const AdvertisementImage = mongoose.model(
  'AdvertisementImage',
  AdvertisementImageSchema
);
module.exports = AdvertisementImage;
