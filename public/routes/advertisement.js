const router = require('express').Router();
const fs = require('fs');

const partialHeaderAuth = fs.readFileSync(
  './public/views/partials/header-auth.html',
  'utf8'
);
const partialHeaderAnon = fs.readFileSync(
  './public/views/partials/header-anon.html',
  'utf8'
);
const partialFooter = fs.readFileSync(
  './public/views/partials/footer.html',
  'utf8'
);
const newAdvertisementPage = fs.readFileSync(
  './public/views/advertisement/new-advertisement.html',
  'utf8'
);
const advertisementPage = fs.readFileSync(
  './public/views/advertisement/advertisement.html',
  'utf8'
);
const marketPage = fs.readFileSync('./public/views/market/market.html', 'utf8');

router.get('/advertisement', (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  return res.send(header + newAdvertisementPage + partialFooter);
});

router.get('/advertisement/:id', (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  return res.send(header + advertisementPage + partialFooter);
});

router.get('/market', (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  return res.send(header + marketPage + partialFooter);
});

module.exports = router;
