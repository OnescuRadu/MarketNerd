const router = require('express').Router();
const { clientUserAuth } = require('../../middleware/authMiddleware');
const fs = require('fs');

//--Views
const partialHeaderAuth = fs.readFileSync(
  './public/views/partials/header-auth.html',
  'utf8'
);

const partialFooter = fs.readFileSync(
  './public/views/partials/footer.html',
  'utf8'
);

const chatPage = fs.readFileSync('./public/views/chat/chat.html', 'utf8');

//--Routes for Frontend

//GET Method
//Gets the chat page
router.get('/', clientUserAuth, (req, res) => {
  return res.send(partialHeaderAuth + chatPage + partialFooter);
});

module.exports = router;
