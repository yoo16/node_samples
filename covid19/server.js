//モジュール読み込み
const express = require('express')
const request = require('request')

const totalUrl = 'https://covid19-japan-web-api.now.sh/api/v1/total';
const prefecturesUrl = 'https://covid19-japan-web-api.now.sh/api/v1/prefectures';
const positivesUrl = 'https://covid19-japan-web-api.now.sh/api/v1/positives';

//サーバーを作る
const app = express()

//Copy & Paste
//JSON
app.use(express.json());

//URL エンコード
app.use(express.urlencoded({ extended: true }));

//CROS対策 XSS クロスサイトスクリプティング
app.use((req, res, next) => {
    //CROS設定: 全てのドメインに対して許可 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //次の処理
    next();
});

app.post('/api/covid19/total', (req, res) => {
    //レスポンス
    let options = {
        url: totalUrl,
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        qs: null,
        json: true
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("error", error);
        } else {
            res.send(body);
        }
    });
});

//サーバ listen
app.listen(3000)