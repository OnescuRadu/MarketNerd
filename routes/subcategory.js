const router = require('express').Router();
const Subcategory = require('../models/Subcategory');

router.get('/', async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    return res.send({ response: subcategories });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

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
