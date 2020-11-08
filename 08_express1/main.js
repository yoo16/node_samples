"use strict";

const port = 3000;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);

    res.send("Hello Express!");
});

app.listen(port, () => {
    console.log(`サーバー起動、ポート（${port}）を監視中`);
});