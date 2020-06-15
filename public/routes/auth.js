const router = require('express').Router();
const request = require('request');
const {
  clientAnonymousAuth,
  clientUserAuth
} = require('../../middleware/authMiddleware');

router.get('/login', clientAnonymousAuth, (req, res) => {
  return res.render('auth/login/login.ejs', {
    user: { name: null, id: null }
  });
});

router.get('/register', clientAnonymousAuth, (req, res) => {
  return res.render('auth/register/register.ejs', {
    user: { name: null, id: null }
  });
});

router.get('/logout', clientUserAuth, (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

module.exports = router;
