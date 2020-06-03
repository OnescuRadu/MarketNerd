const rules = {
  title: 'required|min:8|max:40',
  category: 'required',
  subcategory: 'required',
  description: 'required|min:8|max:100',
  price: 'required|float|above:1',
  city: 'required',
  used: 'required|boolean'
};

const messages = {
  'title.required': 'Title is required.',
  'category.required': 'Category is required.',
  'subcategory.required': 'Subcategory is required.',
  'description.required': 'Description is required.',
  'price.required': 'Price is required.',
  'city.required': 'Location is required.',
  'used.required': 'Product used status is required.',
  'title.min': 'Title is too short. Minimum length is 8 characters.',
  'title.max': 'Title is too long. Maximum length is 40 characters.',
  'description.min':
    'Description is too short. Minimum length is 8 characters.',
  'description.max':
    'Description is too long. Maximum length is 40 characters.',
  'price.float': 'Price is invalid.',
  'price.above': 'Price minimum value is 1.',
  'used.boolean': 'Product used status is invalid.'
};

module.exports = { rules, messages };
