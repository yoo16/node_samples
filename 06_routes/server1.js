"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>About Us</h1>",
    "/hello": "<h1>Hello Page</h1>",
    "/error": "<h1>Error</h1>"
}

const app = http.createServer();
app.on('request', (request, response) => {
    let contentType = { "Content-Type": "text/html" };
    if (request.url === "/error") {
        response.writeHead(httpStatus.NOT_FOUND, contentType);
    } else {
        response.writeHead(httpStatus.OK, contentType);
    }

    let contents = '<h1>Hello Node Server!</h1>';
    if (routeResponseMap[request.url]) {
        contents = routeResponseMap[request.url];
    }
    response.end(contents);

    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);