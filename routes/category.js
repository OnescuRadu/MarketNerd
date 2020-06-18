const router = require('express').Router();
const Category = require('../models/Category');

//GET - Method
//Retrieves all the categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    return res.send({ response: categories });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

//GET - Method
//Retrieves a category by id
router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);
    return res.send({ response: categories });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

module.exports = router;
