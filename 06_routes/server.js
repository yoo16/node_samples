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

const app = http.createServer(function (req, res) {
    let post = '';
    let responseMessage = "<h1>Hello!</h1>";

    const routeResponseMap = {
        "/info": "<h1>Info Page</h1>",
        "/contact": "<h1>Contact Us</h1>",
        "/about": "<h1>Learn More About Us</h1>",
        "/hello": "<h1>Say hello by emailing us <a href='mailto:abc@aaa.bbb'>here</a></h1>",
        "/error": "<h1>Sorry, the page you are looking for is not here</h1>"
    }

    if (req.url === "/error") {
        res.writeHead(httpStatus.NOT_FOUND, {
            "Content-Type": "text/html"
        });
    } else {
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
    }

    // リクエストの経路がマップで定義されているかチェック
    if (routeResponseMap[req.url]) {
        responseMessage = routeResponseMap[req.url];
    }

    // レスポンスに書き込む
    res.writeHead(httpStatus.OK, { 'Content-Type': 'text/html' });
    res.write(responseMessage);
    res.end();

    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);