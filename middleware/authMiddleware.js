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
const error401Page = fs.readFileSync(
  './public/views/error/error-401.html',
  'utf8'
);

//--API Authentication Middleware
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

//--Client Authentication Middleware
const clientAnonymousAuth = (req, res, next) => {
  if (!req.session.auth) {
    return next();
  } else {
    return res.redirect('/');
  }
};

const clientUserAuth = (req, res, next) => {
  if (req.session.auth && req.session.auth.id) {
    return next();
  } else {
    return res.send(partialHeaderAnon + error401Page + partialFooter);
  }
};

const clientAdminAuth = (req, res, next) => {
  if (req.session.auth && req.session.auth.id) {
    if (req.session.auth.role === 'Admin') {
      return next();
    } else {
      return res.send(partialHeaderAuth + error401Page + partialFooter);
    }
  } else {
    return res.send(partialHeaderAnon + error401Page + partialFooter);
  }
};

module.exports = {
  apiUserAuth,
  apiAdminUserAuth,
  clientAnonymousAuth,
  clientUserAuth,
  clientAdminAuth
};
