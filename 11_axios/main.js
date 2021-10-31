const client = require('./client');

async function fetchProduct(id) {
    return await client.get('products/' + id);
}

const id = process.argv[2]
if (!id) {
    console.log('Please, input id')
    return;
}
fetchProduct(id).then(value => console.log(value.data));