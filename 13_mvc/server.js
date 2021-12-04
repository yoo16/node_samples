const express = require('express')
const routes = require('./routes')

require('dotenv').config()
const host = process.env.HOST
const port = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const layouts = require('express-ejs-layouts')
app.set('layout', 'layouts/default');
app.use(layouts);

app.set('view engine', 'ejs')
app.use(routes)

app.listen(port, host, () => {
    console.log(`Server listen: http://${host}:${port}`)
})