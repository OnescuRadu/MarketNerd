const router = require('express').Router();
const fs = require('fs');
const {
  clientAnonymousAuth,
  clientUserAuth
} = require('../../middleware/authMiddleware');

//--Views
const partialHeaderAnon = fs.readFileSync(
  './public/views/partials/header-anon.html',
  'utf8'
);
const partialFooter = fs.readFileSync(
  './public/views/partials/footer.html',
  'utf8'
);
const loginPage = fs.readFileSync(
  './public/views/auth/login/login.html',
  'utf8'
);
const registerPage = fs.readFileSync(
  './public/views/auth/register/register.html',
  'utf8'
);

//--Routes for Frontend

//GET Method
//Gets the login page
router.get('/login', clientAnonymousAuth, (req, res) => {
  return res.send(partialHeaderAnon + loginPage + partialFooter);
});

//GET Method
//Gets the register page
router.get('/register', clientAnonymousAuth, (req, res) => {
  return res.send(partialHeaderAnon + registerPage + partialFooter);
});

//GET Method
//Destroys session and redirects to the "/" path
router.get('/logout', clientUserAuth, (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

module.exports = router;
