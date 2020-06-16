const router = require('express').Router();
const fs = require('fs');

const {
  clientAnonymousAuth,
  clientUserAuth
} = require('../../middleware/authMiddleware');

const partialHeaderAnon = fs.readFileSync(
  './public/views/partials/header-anon.html',
  'utf8'
);
const partialFooter = fs.readFileSync(
  './public/views/partials/footer.html',
  'utf8'
);
const loginPage = fs.readFileSync('./public/views/auth/login/login.html', 'utf8');
const registerPage = fs.readFileSync(
  './public/views/auth/register/register.html',
  'utf8'
);

router.get('/login', clientAnonymousAuth, (req, res) => {
  return res.send(partialHeaderAnon + loginPage + partialFooter);
});

router.get('/register', clientAnonymousAuth, (req, res) => {
  return res.send(partialHeaderAnon + registerPage + partialFooter);
});

router.get('/logout', clientUserAuth, (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

module.exports = router;
