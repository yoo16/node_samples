"use strict";

const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const html = fs.readFileSync('index.html');

require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    let post = '';
    request.on('data', (value) => {
        post+= value;
    });
    request.on('end', () => {
        if (post) {
            post = querystring.parse(post);
            console.log(post);
        }
        response.end(html);
    });

    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
});

app.listen(port, host);

console.log(`Server listen: http://${host}:${port}`);