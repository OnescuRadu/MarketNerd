const express = require('express');
const app = express();
const config = require('./config/misc.config');
const path = require('path');
let ejs = require('ejs');

/* ---Setup body parser */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

/* ---Setup Template Engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views/'));
app.use(express.static('public/views/'));

/* ---Setup Static Resources */
app.use('/css', express.static(__dirname + '/node_modules/mdbootstrap/css/'));
app.use('/js', express.static(__dirname + '/node_modules/mdbootstrap/js/'));

/* ---Setup database */
const database = require('./database/database')();

/* ---Setup Seeders */
const roleSeeder = require('./seeder/roleSeeder')();
const categorySeeder = require('./seeder/categorySeeder')();
const subcategorySeeder = require('./seeder/subcategorySeeder')();
const citySeeder = require('./seeder/citySeeder')();

/* ---Setup Session */
const session = require('express-session');
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

/* ---Add API routes */
const authAPI = require('./routes/auth');
const advertisementAPI = require('./routes/advertisement');
const categoryAPI = require('./routes/category');
const subcategoryAPI = require('./routes/subcategory');

app.use('/api', authAPI);
app.use('/api/advertisement', advertisementAPI);
app.use('/api/category', categoryAPI);
app.use('/api/subcategory', subcategoryAPI);

/* ---Add PUBLIC(FRONTEND) routes */
const authPublic = require('./public/routes/auth');
const chatPublic = require('./public/routes/chat');
const indexPublic = require('./public/routes/index');
const advertisementPublic = require('./public/routes/advertisement');
app.use(authPublic);
app.use('/chat', chatPublic);
app.use(indexPublic);
app.use(advertisementPublic);

/* ---Start server */
const PORT = process.env.PORT || 3000;
server = app.listen(PORT, error => {
  if (error) {
    console.log(
      `An error occured while starting the server. Error details: ${error}`
    );
  } else {
    console.log(`Server running on port ${PORT}...`);
  }
});

/* ---Setup Socket.io */
const io = require('socket.io')(server);

io.on('connection', socket => {
  {
    const user = JSON.parse(socket.handshake.query.user);
    const userName = user.name || 'Anonymous';
    const userId = user.id || null;

    io.sockets.emit('connection-message', {
      message: `${userName} has joined the chat.`
    });

    socket.on('disconnect', () => {
      io.sockets.emit('connection-message', {
        message: `${userName} has left the chat.`
      });
    });

    socket.on('message', data => {
      io.sockets.emit('message', {
        message: `${data.message}`,
        user: { name: userName, id: userId },
        avatar:
          'https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png'
      });
    });
  }
});
