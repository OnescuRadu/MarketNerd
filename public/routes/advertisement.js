const router = require('express').Router();
const fs = require('fs');
const Advertisement = require('../../models/Advertisement');
const { clientUserAuth } = require('../../middleware/authMiddleware');

//--Views
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
const advertisementPage = fs.readFileSync(
  './public/views/advertisement/advertisement.html',
  'utf8'
);
const newAdvertisementPage = fs.readFileSync(
  './public/views/advertisement/new-advertisement.html',
  'utf8'
);
const editAdvertisementPage = fs.readFileSync(
  './public/views/advertisement/edit-advertisement.html',
  'utf8'
);
const userAdvertisementPage = fs.readFileSync(
  './public/views/advertisement/user-advertisement.html',
  'utf8'
);
const userOwnAdvertisementPage = fs.readFileSync(
  './public/views/advertisement/user-own-advertisement.html',
  'utf8'
);
const advertisementImagesPage = fs.readFileSync(
  './public/views/advertisement/advertisement-images.html',
  'utf8'
);

const error401Page = fs.readFileSync(
  './public/views/error/error-401.html',
  'utf8'
);

const marketPage = fs.readFileSync('./public/views/market/market.html', 'utf8');

//--Routes for Frontend

//GET Method
//Gets the advertisement page
router.get('/advertisement', clientUserAuth, (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  return res.send(header + newAdvertisementPage + partialFooter);
});

//GET Method
//Gets a specific advertisement's page
router.get('/advertisement/:id', (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  return res.send(header + advertisementPage + partialFooter);
});

//GET Method
//Gets the user's advertisements page
router.get('/advertisement/user/:id', async (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  if (req.session.auth && req.session.auth.id === req.params.id) {
    return res.send(header + userOwnAdvertisementPage + partialFooter);
  }
  return res.send(header + userAdvertisementPage + partialFooter);
});

//GET Method
//Gets the edit advertisement page
router.get('/advertisement/:id/edit', clientUserAuth, async (req, res) => {
  const advertisement = await Advertisement.findById(req.params.id);
  if (req.session.auth.id === advertisement.user.toString()) {
    return res.send(partialHeaderAuth + editAdvertisementPage + partialFooter);
  }
  return res.send(partialHeaderAuth + error401Page + partialFooter);
});

//GET Method
//Gets the advertisement's images page
router.get('/advertisement/:id/images', clientUserAuth, async (req, res) => {
  const advertisement = await Advertisement.findById(req.params.id);
  if (req.session.auth.id === advertisement.user.toString()) {
    return res.send(
      partialHeaderAuth + advertisementImagesPage + partialFooter
    );
  }
  return res.send(partialHeaderAuth + error401Page + partialFooter);
});

//GET Method
//Gets the market page
router.get('/market', (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  return res.send(header + marketPage + partialFooter);
});

module.exports = router;
