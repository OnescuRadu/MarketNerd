const mongoose = require('mongoose');
const connectionString = require('../config/database.config').CONNECTION_STRING;

const connect = () => {
  mongoose.set('useCreateIndex', true);

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('Database connection is open.');
  });

  mongoose.connection.on('error', error => {
    console.log('Database connection has occured ' + error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection is disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Database connection is disconnected due to application termination'
      );
      process.exit(0);
    });
  });
};

module.exports = connect;
