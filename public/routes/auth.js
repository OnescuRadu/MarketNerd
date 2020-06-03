const router = require('express').Router();

//TODO ONLY FOR ANONYMOUS
router.get('/login', (req, res) => {
  return res.render('auth/login/login.ejs', {
    user: { name: null, id: null }
  });
});

//TODO ONLY FOR ANONYMOUS
router.get('/register', (req, res) => {
  return res.render('auth/register/register.ejs', {
    user: { name: null, id: null }
  });
});

//TODO
router.get('/logout', (req, res) => {
  return res.render('auth/index.ejs');
});

module.exports = router;
