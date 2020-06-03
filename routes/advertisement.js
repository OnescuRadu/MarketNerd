const router = require('express').Router();
const { validate } = require('indicative/validator');
const { apiUserAuth } = require('../middleware/authMiddleware');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Advertisement = require('../models/Advertisement');
const City = require('../models/City');
const {
  rules: validationRules,
  messages: validationMessages
} = require('../validation/advertisementValidation');

router.post('/', apiUserAuth, async (req, res) => {
  const {
    title,
    category,
    subcategory,
    description,
    price,
    city,
    used
  } = req.body;

  validate(req.body, validationRules, validationMessages)
    .then(async () => {
      try {
        //Check to see if the category exists
        const existingCategory = await Category.findById(category);
        if (existingCategory) {
          //Check to see if the subcategory exists
          const existingSubcategory = await Subcategory.findOne({
            _id: subcategory,
            category: existingCategory
          });
          if (existingCategory) {
            //Check to see if the city exists
            const existingCity = await City.findById(city);
            if (existingCity) {
              //Create the advertisement object
              const advertisementData = {
                title: title,
                category: existingCategory.id,
                subcategory: existingSubcategory.id,
                description: description,
                price: price,
                city: city,
                used: used,
                user: req.session.auth.id
              };

              //Insert the advertisement object into the DB
              Advertisement.create(advertisementData, error => {
                if (error) {
                  return res.status(500).send({ response: error });
                } else {
                  return res.send({
                    response: 'Advertisement succesfully created.'
                  });
                }
              });
            } else {
              return res.status(400).send({ response: 'Invalid location.' });
            }
          } else {
            return res.status(400).send({ response: 'Invalid subcategory.' });
          }
        } else {
          return res.status(400).send({ response: 'Invalid category.' });
        }
      } catch (error) {
        return res.status(500).send({ response: error });
      }
    })
    .catch(error => {
      return res.status(400).send({ response: error[0].message });
    });
});

router.get('/:id', async (req, res) => {
  try {
    const advertisements = await Advertisement.findById(req.params.id)
      .populate('user', 'email firstName lastName')
      .populate('category', 'title')
      .populate('subcategory', 'title')
      .populate('city', 'title');
    return res.send({ response: advertisements });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

router.get('/', async (req, res) => {
  const { page = 1, limit = 10, category, subcategory } = req.query;
  try {
    let advertisements = [];
    if (category) {
      //Get all advertisements using the given category and subcategory
      if (subcategory) {
        advertisements = await Advertisement.find({
          category: category,
          subcategory: subcategory
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate('user', 'email firstName lastName')
          .populate('category', 'title')
          .populate('subcategory', 'title')
          .populate('city', 'title');
      } else {
        //Get all advertisements using the given category
        advertisements = await Advertisement.find({ category: category })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate('user', 'email firstName lastName')
          .populate('category', 'title')
          .populate('subcategory', 'title')
          .populate('city', 'title');
      }
    } else {
      //Get all advertisements
      advertisements = await Advertisement.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('user', 'email firstName lastName')
        .populate('category', 'title')
        .populate('subcategory', 'title')
        .populate('city', 'title');
    }
    return res.send({ response: advertisements });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

router.patch('/:id', apiUserAuth, (req, res) => {
  const {
    title,
    category,
    subcategory,
    description,
    price,
    city,
    used
  } = req.body;

  validate(req.body, validationRules, validationMessages)
    .then(async () => {
      try {
        //Check to see if the advertisement exists
        const advertisement = await Advertisement.findById(req.params.id);
        if (advertisement) {
          //Check to see if the advertisement has been created by the user that makes the request
          if (advertisement.user == req.session.auth.id) {
            //Check to see if the category exists
            const existingCategory = await Category.findById(category);
            if (existingCategory) {
              //Check to see if the subcategory exists
              const existingSubcategory = await Subcategory.findOne({
                _id: subcategory,
                category: existingCategory
              });
              if (existingCategory) {
                //Check to see if the city exists
                const existingCity = await City.findById(city);
                if (existingCity) {
                  //Create the advertisement object
                  const advertisementData = {
                    title: title,
                    category: existingCategory.id,
                    subcategory: existingSubcategory.id,
                    description: description,
                    price: price,
                    city: city,
                    used: used,
                    user: req.session.auth.id
                  };

                  //Insert the advertisement object into the DB
                  Advertisement.findOneAndUpdate(advertisementData, error => {
                    if (error) {
                      return res.status(500).send({ response: error });
                    } else {
                      return res.send({
                        response: 'Advertisement succesfully updated.'
                      });
                    }
                  });
                } else {
                  return res
                    .status(400)
                    .send({ response: 'Invalid location.' });
                }
              } else {
                return res
                  .status(400)
                  .send({ response: 'Invalid subcategory.' });
              }
            } else {
              return res.status(400).send({ response: 'Invalid category.' });
            }
          } else {
            return res.status(401).send({ response: 'Unathorized request.' });
          }
        } else {
          return res.status(400).send({ response: 'Invalid advertisement.' });
        }
      } catch (error) {
        return res.status(500).send({ response: error });
      }
    })
    .catch(error => {
      return res.status(400).send({ response: error[0].message });
    });
});

router.delete('/:id', apiUserAuth, async (req, res) => {
  try {
    //Find the advertisement
    const advertisement = await Advertisement.findById(req.params.id);
    //Check to see if the user that posted the advertisement is the one that is making the request
    if (advertisement.user === req.session.auth.id) {
      Advertisement.deleteOne({ _id: req.params.id });
      return res.send({ response: 'Advertisement succesfully deleted.' });
    } else {
      return res.status(401).send({ response: 'Unauthorized request.' });
    }
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

module.exports = router;
