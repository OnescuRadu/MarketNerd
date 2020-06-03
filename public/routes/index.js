const router = require('express').Router();

router.get('/', (req, res) => {
  return res.render('index/index.ejs', {
    user:
      req.session.auth === undefined
        ? { name: null, id: null }
        : { name: req.session.auth.name, id: req.session.auth.id }
  });
});

module.exports = router;
