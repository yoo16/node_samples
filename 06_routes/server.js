"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
// const process = require('process');

const querystring = require('querystring');
const fs = require('fs');
const config = require('config');
// config.env = process.env.NODE_ENV;

const html = fs.readFileSync('index.html');
const port = config.server.port;
const host = config.server.host;

const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us</h1>",
    "/hello": "<h1>Say hello by emailing us <a href='mailto:abc@aaa.bbb'>here</a></h1>",
    "/error": "<h1>Sorry, the page you are looking for is not here</h1>"
}

const app = http.createServer(function (request, response) {
    let post = '';
    let responseMessage = html;

    request.on('data', (value) => {
        post+= value;
    });
    request.on('end', () => {
        if (post) {
            post = querystring.parse(post);
            console.log(post);
        }
        response.end(responseMessage);
    });

    if (request.url === "/error") {
        response.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/html" });
    } else {
        response.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
    }

    console.log(request.url);
    // リクエストの経路がマップで定義されているかチェック
    if (routeResponseMap[request.url]) {
        responseMessage = routeResponseMap[request.url];
    }

    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);