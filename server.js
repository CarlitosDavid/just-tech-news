const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
// This code sets up an Express.js session and 
// connects the session to our Sequelize database
const SequelizeStore = require('connect-session-sequelize')(session.Store); 
// All we need to do to 
// tell our session to use cookies is to set cookie to be {}.
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



//  The router instance in routes/index.js collected everything for us and packaged them up for server.js to use.
// note we're importing the connection to Sequelize from config/connection.js. Then, at the bottom of the file, we use the sequelize.sync() method to establish the connection to the database.
// The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it for you!
// The other thing to notice is the use of {force: false} in the .sync() method. 
// This doesn't have to be included, but if it were set to true, it would drop and re-create all of the database tables on startup.