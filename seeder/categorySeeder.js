const Category = require('../models/Category');

let categoryData = [
  {
    title: 'Cars, motorcyles and boats',
    icon: 'fas fa-car'
  },
  {
    title: 'Real Estate',
    icon: 'fas fa-building'
  },
  {
    title: 'Electronics and appliances',
    icon: 'fas fa-plug'
  },
  {
    title: 'Fashion and beauty',
    icon: 'fas fa-tshirt'
  },
  {
    title: 'House and garden',
    icon: 'fas fa-home'
  },
  {
    title: 'Mother and child',
    icon: 'fas fa-female'
  },
  {
    title: 'Sports, leisure, art',
    icon: 'fas fa-palette'
  },
  {
    title: 'Agriculture and industry',
    icon: 'fas fa-industry'
  }
];

module.exports = async () => {
  const categoryCount = await Category.collection.countDocuments();
  if (!categoryCount) {
    Category.create(categoryData)
      .then(category => {
        console.log(
          `Category seed done: ${category.length} categories created`
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
};
