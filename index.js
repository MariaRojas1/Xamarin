const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const {database} = require('./keys');
//
//const misrutas = require('./routes/index');
//const bodyParser = require('body-parser');
//
const app = express();
//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partial'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))

app.set('view engine', '.hbs');
app.set('json spaces', 2);

//MIDLEWARES, para morgan peeticiones
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//variables globales
app.use((req, res, next) => {
    next();
});

//rutas
app.use(require('./routes'));
app.use('/parcial', require('./routes/parcial'))
app.use('/asignar_materias', require('./routes/asignar_materias'))
app.use('/docentes', require('./routes/docentes'))
app.use('/materias', require('./routes/materias'))
app.use('/periodo_academico', require('./routes/periodo_academico'))
app.use('/estudiantes', require('./routes/estudiantes'))
app.use('/notas', require('./routes/notas'))
app.use('/usuario', require('./routes/usuario'))
app.use('/productos', require('./routes/productos'))

    //public
app.unsubscribe(express.static(path.join(__dirname, 'public')));

//arranca el servidor
app.listen(app.get('port'), () => {
    console.log('el servidor esta en el puerto numero', app.get('port'));
})