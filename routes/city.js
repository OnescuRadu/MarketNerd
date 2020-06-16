const router = require('express').Router();
const City = require('../models/City');

router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    return res.send({ response: cities });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    return res.send({ response: city });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

module.exports = router;
