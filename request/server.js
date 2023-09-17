"use strict"

const http = require('http')
const querystring = require('querystring')

const fs = require('fs')
const html = fs.readFileSync('index.html')

require('dotenv').config()
const host = process.env.HOST
const port = process.env.PORT

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    let post = ''
    req.on('data', (value) => {
        post += value
    })

    req.on('end', () => {
        if (post) {
            post = querystring.parse(post)
            console.log(post)
        }
        res.write(html)
        res.end()
    })

    console.log(`Method: ${req.method}`)
    console.log(`URL: ${req.url}`)
})

app.listen(port, host)

console.log(`Server listen: http://${host}:${port}`)