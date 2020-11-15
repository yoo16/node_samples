"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
// const fs = require('fs');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>About Us</h1>",
    "/hello": "<h1>Hello Page</h1>",
    "/error": "<h1>Sorry, This Page is Error</h1>"
}

const app = http.createServer(function (request, response) {
    //let responseMessage = fs.readFileSync('public/index.html');
    if (request.url === "/error") {
        response.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/html" });
    } else {
        response.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
    }

    //let responseMessage = fs.readFileSync('public/index.html');
    let responseMessage = '<h1>Hello Node Server!</h1>';
    if (routeResponseMap[request.url]) {
        responseMessage = routeResponseMap[request.url];
    }
    response.end(responseMessage);

    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);