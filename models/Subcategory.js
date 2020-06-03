const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema(
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
    }
  },
  {
    timestamps: true
  }
);

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);
module.exports = Subcategory;
