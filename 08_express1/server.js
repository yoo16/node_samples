"use strict";

const express = require('express');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const app = express();

//Webルート GETリクエスト 
app.get("/", (req, res) => {
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);

    res.send("Hello Express!");
});

//profile GETリクエスト 
app.get("/profile", (req, res) => {
    res.send("This is Profile page.");
});

//add POSTリクエスト 
app.post("/add", (req, res) => {
    conseol.log(req.body);
});

//サーバ待機
app.listen(port, host, () => {
    console.log(`app listen: ${host}:${port}`);
});