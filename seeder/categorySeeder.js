const Category = require('../models/Category');

let categoryData = [
  {
    title: 'Cars, motorcyles and boats'
  },
  {
    title: 'Real Estate'
  },
  {
    title: 'Electronics and appliances'
  },
  {
    title: 'Fashion and beauty'
  },
  {
    title: 'House and garden'
  },
  {
    title: 'Mother and child'
  },
  {
    title: 'Sports, leisure, art'
  },
  {
    title: 'Agriculture and industry'
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
