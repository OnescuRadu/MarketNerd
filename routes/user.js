const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Advertisement = require('../models/Advertisement');
const { apiUserAuth } = require('../middleware/authMiddleware');
const emailConfig = require('../config/email.config');

//GET - Method
//Retrieves the current logged in user
router.get('/', apiUserAuth, (req, res) => {
  return res.send({ response: req.session.auth });
});

//POST - Method
//Sends email to user
router.post('/:id/mail', apiUserAuth, async (req, res) => {
  const { message, advertisementId } = req.body;
  const userRecipient = await User.findById(req.params.id);
  const userSender = await User.findById(req.session.auth.id);
  const advertisement = await Advertisement.findById(advertisementId);

  //If the recipient user exists
  if (userRecipient) {
    //If the advertisement exists
    if (advertisement) {
      //Create the email
      const mailOptions = {
        from: emailConfig.EMAIL, //set sender email address
        to: userRecipient.email, //set recipient email address
        subject: `You have a new message from MarketNerd`, //set the subject
        text: `You have been contacted by ${userSender.firstName} ${userSender.lastName} about the following product: ${advertisement.title}.
        Message: ${message}
        Senders mail: ${userSender.email}` //set the message
      };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailConfig.EMAIL,
          pass: emailConfig.PASSWORD
        }
      });

      //Send the email using the mailOptions object created
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return res.status(500).send({ response: error });
        } else {
          return res.send({ response: 'Successfully sent email.' });
        }
      });
    } else {
      return res
        .status(404)
        .send({ response: 'Advertisement does not exist.' });
    }
  } else {
    return res.status(404).send({ response: 'User does not exist.' });
  }
});

module.exports = router;
