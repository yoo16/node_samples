const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);

    res.send("Hello Express!");
});

app.get("/profile", (req, res) => {
    res.send("This is Profile page.");
});

app.post('/auth', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    var message = 'ログインできませんでした';
    if (login_name == process.env.LOGIN_NAME && password == process.env.PASSWORD) {
        message = 'ログインしました';
    }
    res.send(message);
})

app.listen(PORT, HOST, () => {
    console.log(`Server listen: http://${PORT}:${HOST}`);
});