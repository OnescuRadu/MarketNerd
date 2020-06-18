const router = require('express').Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const awsConfig = require('../config/aws.config');
const { validate } = require('indicative/validator');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Advertisement = require('../models/Advertisement');
const AdvertisementImage = require('../models/AdvertisementImage');
const City = require('../models/City');
const { v4: uuid } = require('uuid');
const { apiUserAuth } = require('../middleware/authMiddleware');
const {
  rules: validationRules,
  messages: validationMessages
} = require('../validation/advertisementValidation');

//Set the AWS Keys
aws.config.update({
  secretAccessKey: awsConfig.SECRET_ACCESS_KEY,
  accessKeyId: awsConfig.ACCESS_KEY_ID,
  region: awsConfig.REGION
});

//Initialize the S3 Dependency
const s3 = new aws.S3();

//Initialize multer
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: awsConfig.BUCKET,
    key: function(req, file, cb) {
      cb(null, `${uuid()}.${file.mimetype.split('/').pop()}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

//POST - Method
//Creates a new advertisement
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

  let usedStatus = false;
  if (used !== undefined) {
    usedStatus = true;
  }
  req.body.used = usedStatus;

  //Validate the incoming data
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
                used: usedStatus,
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

//GET - Method
//Gets an advertisement by id
router.get('/:id', async (req, res) => {
  try {
    const advertisements = await Advertisement.findOne({
      _id: req.params.id,
      deleted: false
    })
      .populate('user', 'email firstName lastName')
      .populate('category', 'title')
      .populate('subcategory', 'title')
      .populate('city', 'title')
      .populate('images', 'href');
    return res.send({ response: advertisements });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

//GET - Method
//Gets all the advertisements
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, category, subcategory } = req.query;
  try {
    let advertisements = [];
    if (category) {
      //Get all advertisements using the given category and subcategory
      if (subcategory) {
        advertisements = await Advertisement.find({
          category: category,
          subcategory: subcategory,
          deleted: false
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate('user', 'email firstName lastName')
          .populate('category', 'title')
          .populate('subcategory', 'title')
          .populate('city', 'title')
          .populate('images', 'href')
          .sort({ createdAt: -1 });
      } else {
        //Get all advertisements using the given category
        advertisements = await Advertisement.find({
          category: category,
          deleted: false
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate('user', 'email firstName lastName')
          .populate('category', 'title')
          .populate('subcategory', 'title')
          .populate('city', 'title')
          .populate('images', 'href')
          .sort({ createdAt: -1 });
      }
    } else {
      //Get all advertisements
      advertisements = await Advertisement.find({ deleted: false })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('user', 'email firstName lastName')
        .populate('category', 'title')
        .populate('subcategory', 'title')
        .populate('city', 'title')
        .populate('images', 'href')
        .sort({ createdAt: -1 });
    }
    return res.send({ response: advertisements });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

//GET - Method
//Gets all the advertisement of an user
router.get('/user/:id', async (req, res) => {
  try {
    const advertisements = await Advertisement.find({
      user: { _id: req.params.id },
      deleted: false
    })
      .populate('user', 'email firstName lastName')
      .populate('category', 'title')
      .populate('subcategory', 'title')
      .populate('city', 'title')
      .populate('images', 'href');
    return res.send({ response: advertisements });
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

//PATCH - Method
//Updates an advertisement
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
                  Advertisement.findOneAndUpdate(
                    { _id: advertisement._id },
                    { $set: advertisementData },
                    error => {
                      if (error) {
                        return res.status(500).send({ response: error });
                      } else {
                        return res.send({
                          response: 'Advertisement succesfully updated.'
                        });
                      }
                    }
                  );
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

//DELETE - Method
//Delete an advertisement by id
router.delete('/:id', apiUserAuth, async (req, res) => {
  try {
    //Find the advertisement
    const advertisement = await Advertisement.findById(req.params.id);
    //Check to see if the user that posted the advertisement is the one that is making the request
    if (advertisement.user.toString() === req.session.auth.id) {
      Advertisement.findOneAndUpdate(
        { _id: advertisement._id },
        { $set: { deleted: true } },
        error => {
          if (error) {
            return res.status(500).send({ response: error });
          } else {
            return res.send({
              response: 'Advertisement succesfully deleted.'
            });
          }
        }
      );
    } else {
      return res.status(401).send({ response: 'Unauthorized request.' });
    }
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

//POST - Method
//Mark an advertisement as sold
router.post('/:id/sold', apiUserAuth, async (req, res) => {
  try {
    //Find the advertisement
    const advertisement = await Advertisement.findById(req.params.id);
    //Check to see if the user that posted the advertisement is the one that is making the request
    if (advertisement.user.toString() === req.session.auth.id) {
      if (advertisement.deleted === false) {
        Advertisement.findOneAndUpdate(
          { _id: advertisement._id },
          { $set: { sold: true } },
          error => {
            if (error) {
              return res.status(500).send({ response: error });
            } else {
              return res.send({
                response: 'Advertisement succesfully marked as sold.'
              });
            }
          }
        );
      } else {
        return res.status(400).send({
          response:
            'Can not mark as sold an advertisement that has been deleted.'
        });
      }
    } else {
      return res.status(401).send({ response: 'Unauthorized request.' });
    }
  } catch (error) {
    return res.status(500).send({ response: error });
  }
});

const uploadAdvertisementImages = upload.array('advertisement-image');

//POST - Method
//Upload images to an advertisement
router.post('/:id/image', apiUserAuth, async (req, res) => {
  //Get the advertisement from the database
  const advertisement = await Advertisement.findById(req.params.id);
  //Check if the advertisement exists
  if (advertisement) {
    //Check if the user making hte request is the owner of the advertisement
    if (advertisement.user.toString() === req.session.auth.id) {
      try {
        //Upload images to S3 Bucket
        uploadAdvertisementImages(req, res, function(error) {
          if (error) {
            return res.status(400).send({ response: error.message });
          } else {
            //Save S3 Bucket Images' href to database
            req.files.forEach(img => {
              AdvertisementImage.create({
                href: img.location,
                user: req.session.auth.id
              }).then(image => {
                //Update the Advertisement Images Array
                Advertisement.findByIdAndUpdate(req.params.id, {
                  $push: { images: image._id }
                }).exec();
              });
            });
            return res.send({ response: 'Succesfully uploaded image.' });
          }
        });
      } catch (error) {
        return res.status(500).send({ response: error });
      }
    } else {
      return res.status(401).send({ response: 'You are not authorized.' });
    }
  } else {
    return res.status(404).send({ response: 'Advertisement was not found.' });
  }
});

//DELETE - Method
//Delete an image
router.delete('/image/:id', apiUserAuth, async (req, res) => {
  const image = await AdvertisementImage.findById(req.params.id);
  if (image) {
    if (image.user.toString() === req.session.auth.id) {
      AdvertisementImage.findByIdAndRemove(req.params.id, error => {
        if (error) {
          return res.status(500).send({ response: error });
        } else {
          const imageKey = image.href.split('/').pop();
          console.log(imageKey);
          s3.deleteObject(
            {
              Bucket: awsConfig.BUCKET,
              Key: imageKey
            },
            (error, data) => {
              if (error) {
                console.error(`There was an error deleting file ${imageKey}.`);
              }
            }
          );
          return res.send({ response: 'Sucessfully deleted image.' });
        }
      });
    } else {
      return res.status(401).send({ response: 'Unathorized access.' });
    }
  } else {
    return res.status(404).send({ response: 'Image does not exist.' });
  }
});

module.exports = router;
