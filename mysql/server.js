const express = require('express')
const routes = require('./routes')

const dotenv = require('dotenv');
dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 30
    }
}));

const layouts = require('express-ejs-layouts');
app.set('layout', 'layouts/default');
app.set('view engine', 'ejs');
app.use(layouts);

app.use(routes)

app.listen(port, host, () => {
    console.log(`Server listen: http://${host}:${port}`)
})