"use strict";

const express = require('express');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const app = express();

// URLエンコードされたデータを解析する
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Login Check
app.post('/input', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    let message = 'login error!';
    if (login_name == 'test' && password == '1234') {
        message = 'login success!!';
    }
    res.send(message);
})

//サーバ待機
app.listen(port, host, () => {
    console.log(`app listen: ${host}:${port}`);
});