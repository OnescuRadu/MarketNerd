const router = require('express').Router();

router.get('/market', (req, res) => {
  return res.render('market/market.ejs', {
    user:
      req.session.auth === undefined
        ? { name: null, id: null }
        : { name: req.session.auth.name, id: req.session.auth.id },
    category: req.query.categoryId || null
  });
});

router.get('/advertisement/:id', (req, res) => {
  return res.render('advertisement/advertisement.ejs', {
    user:
      req.session.auth === undefined
        ? { name: null, id: null }
        : { name: req.session.auth.name, id: req.session.auth.id }
  });
});

module.exports = router;
