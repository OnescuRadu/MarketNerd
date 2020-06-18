const router = require('express').Router();
const User = require('../models/User');
const Role = require('../models/Role');

const { validate } = require('indicative/validator');
const {
  rules: validationRules,
  messages: validationMessages
} = require('../validation/authValidation');

const bcrypt = require('bcrypt');
const saltRounds = 10;

//POST - Method
//Logs in user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await User.findOne({ email: email }).populate('role');
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.auth = {
          id: user.id,
          role: user.role.title,
          name: `${user.firstName} ${user.lastName}`,
          timestamp: Date.now()
        };
        return res.send({ response: 'Succesfully logged in.' });
      } else {
        return res.status(400).send({ response: 'Invalid email or password.' });
      }
    } else {
      return res.status(400).send({ response: 'Invalid email or password.' });
    }
  } else {
    return res.status(400).send({ response: 'Missing email or password.' });
  }
});

//POST - Method
//Registers user
router.post('/register', async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    passwordConfirmation
  } = req.body;

  //Validate the register data
  validate(req.body, validationRules, validationMessages)
    .then(async () => {
      //Check if the passwords are the same
      if (password === passwordConfirmation) {
        try {
          const existingUser = await User.findOne({
            $or: [{ email: email }, { phoneNumber: phoneNumber }]
          });
          //Checks if a user exists already with the same email or phoneNumber
          if (!existingUser) {
            //Hash the password
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            //Find the role having the title 'User'
            const userRole = await Role.findOne({ title: 'User' });

            //Create the user data
            const userData = {
              email: email,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              password: hashedPassword,
              role: userRole.id
            };

            //Insert the user data into the database
            User.create(userData, error => {
              if (error) {
                return res.status(500).send({ response: error });
              } else {
                return res.send({
                  response: 'User succesfully created.'
                });
              }
            });
          } else {
            return res
              .status(400)
              .send({ response: 'Email or phone number is already used.' });
          }
        } catch (error) {
          return res.status(500).send({ response: error });
        }
      } else {
        return res.status(400).send({ response: 'Passwords do not match.' });
      }
    })
    .catch(error => {
      return res.status(400).send({ response: error[0].message });
    });
});

//GET - Method
//Logs out user
router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.send({ response: 'Succesfully logged out.' });
});

module.exports = router;
