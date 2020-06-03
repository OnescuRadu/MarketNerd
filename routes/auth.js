const router = require('express').Router();
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const { validate } = require('indicative/validator');
const saltRounds = 10;
const {
  rules: validationRules,
  messages: validationMessages
} = require('../validation/authValidation');

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

router.post('/register', async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    passwordConfirmation
  } = req.body;

  validate(req.body, validationRules, validationMessages)
    .then(async () => {
      if (password === passwordConfirmation) {
        try {
          const existingUser = await User.findOne({ email: email });
          if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const userRole = await Role.findOne({ title: 'User' });

            const userData = {
              email: email,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              password: hashedPassword,
              role: userRole.id
            };

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
            return res.status(400).send({ response: 'Email is already used.' });
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

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.send({ response: 'Succesfully logged out.' });
});

module.exports = router;
