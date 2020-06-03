const User = require('../models/User');

const apiUserAuth = (req, res, next) => {
  if (req.session.auth && req.session.auth.id) {
    return next();
  } else {
    res.status(401).send({ response: 'Unathorized access.' });
  }
};

const apiAdminUserAuth = (req, res, next) => {
  if (req.session.auth && req.session.auth.id) {
    if (req.session.auth.role === 'Admin') {
      return next();
    } else {
      res.status(401).send({ response: 'Unathorized access.' });
    }
  } else {
    res.status(401).send({ response: 'Unathorized access.' });
  }
};

const clientUserAuth = (req, res, next) => {
  if (req.session.auth && req.session.auth.id) {
    return next();
  } else {
    return res.render('error/401.ejs', {
      user: { name: null, id: null }
    });
  }
};

const clientAdminAuth = (req, res, next) => {
  if (req.session.auth && req.session.auth.id) {
    if (req.session.auth.role === 'Admin') {
      return next();
    } else {
      return res.render('error/401.ejs', {
        user: { name: null, id: null }
      });
    }
  } else {
    return res.render('error/401.ejs', {
      user: { name: null, id: null }
    });
  }
};

module.exports = {
  apiUserAuth,
  apiAdminUserAuth,
  clientUserAuth,
  clientAdminAuth
};
