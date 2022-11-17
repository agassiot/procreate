var path = require('path');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var routes = require('./controllers');
var helpers = require('./utils/helpers');
var sequelize = require('./config/connection');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var PORT = process.env.PORT || 3001;
var app = express();
var hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


