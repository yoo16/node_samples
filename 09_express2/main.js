"use strict";

const port = 3000;
const express = require("express");
const app = express();

// URLエンコードされたデータを解析する
app.use(express.urlencoded());
app.use(express.json());

// ミドルウェア関数を定義
app.use((req, res, next) => {
    console.log(`リクエストURL：${req.url}`);
    next();
});

app.use("/users", (req, res, next) => {
    console.log(`リクエストURL（ユーザー）：${req.url}`);
    next();
});

// パラメータを取得する経路
app.get("/products/:drink", (req, res) => {
    let drink = req.params.drink;
    res.send(`商品：${drink}`);
});

app.get("/products/:music/info", (req, res) => {
    let music = req.params.music;
    res.send(`曲：${music}`);
});

app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST");
});

// サーバー起動
app.listen(port, () => {
    console.log(`サーバー起動、ポート（${port}）を監視中・・・`);
});