const express = require('express');
const client = require('./client');
const app = express();

app.get('/api/product/:id', (req, res) => {
    fetchProduct(req.params.id).then(
        response => {
            console.log(response.data)
            res.send(response.data);
        }
    ).catch((e) => {
        res.send(e);
    });
})
app.listen(3000);

async function fetchProduct(id) {
    return await client.get('products/' + id);
}
