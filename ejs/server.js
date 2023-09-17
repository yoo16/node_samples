const express = require('express')
const routes = require('./routes')

const dotenv = require('dotenv');
dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express()

app.set('view engine', 'ejs')

app.use(routes)

app.listen(port, host, () => {
    console.log(`Server listen: http://${host}:${port}`)
})