const express = require ('express');
const path = require('path');
const {create} = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
// ===============================================================================INITS

const app = express();
require('./database');

// ===============================================================================SETITNGS

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));

const exphbs = create({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname:'.hbs',
});
app.engine('.hbs', exphbs.engine);

app.set('view engine', '.hbs');

// ===============================================================================MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

// ===============================================================================GLOBAL VARRIABLES

// ===============================================================================ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// ===============================================================================STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// ===============================================================================SERVER IS LISTENNING
app.listen(app.get('port'), () => {
    console.log('Server active on port:', app.get('port'));
});