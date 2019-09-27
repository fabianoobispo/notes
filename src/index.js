const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
//inializar

const app = express();
require('./database');

//configuracao () 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp', 
    resave: true,
    saveUninitialized: true
}));

//variaveis glbais

//rotas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

//arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))
//servidores
app.listen(app.get('port'), () => {
    console.log('Servidor na porta ', app.get('port'));
});