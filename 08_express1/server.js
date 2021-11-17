const express = require('express');

require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Webルート GETリクエスト 
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

    let message = 'ログインできませんでした';
    if (login_name == process.env.LOGIN_NAME && password == process.env.PASSWORD) {
        message = 'ログインしました';
    }
    res.send(message);
})

app.listen(port, host, () => {
    console.log(`Server listen: http://${host}:${port}`);
});