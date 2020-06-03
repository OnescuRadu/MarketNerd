const router = require('express').Router();
const { clientUserAuth } = require('../../middleware/authMiddleware');

// router.get('/', (req, res) => {
//   return res.render('chat/chat.ejs', {
//     user: { name: 'Radu', id: '1231321321' }
//   });
// });

router.get('/', clientUserAuth, (req, res) => {
  console.log(req.session.auth);
  return res.render('chat/chat.ejs', {
    user: { name: req.session.auth.name, id: req.session.auth.id }
  });
});

module.exports = router;
