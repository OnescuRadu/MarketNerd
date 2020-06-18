const router = require('express').Router();
const Subcategory = require('../models/Subcategory');

//GET - Method
//Retrieves all the subcategories
router.get('/', async (req, res) => {
  const categoryId = req.query.categoryId;
  try {
    let subcategories = [];
    if (categoryId) {
      subcategories = await Subcategory.find({ category: categoryId });
    } else {
      subcategories = await Subcategory.find();
    }
    return res.send({ response: subcategories });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

//GET - Method
//Retrieves a subcategory by id
router.get('/:id', async (req, res) => {
  try {
    const subcategories = await Subcategory.find({
      category: req.params.id
    });
    return res.send({ response: subcategories });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

module.exports = router;
