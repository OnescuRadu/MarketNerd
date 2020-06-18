const router = require('express').Router();
const fs = require('fs');

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
const indexPage = fs.readFileSync('./public/views/index/index.html', 'utf8');

//--Routes for Frontend

//GET Method
//Gets the index page
router.get('/', (req, res) => {
  const header =
    req.session.auth === undefined ? partialHeaderAnon : partialHeaderAuth;
  return res.send(header + indexPage + partialFooter);
});

module.exports = router;
