let posts = [
    { name: 'コーヒー', price: 120, stock: 0, },
    { name: '紅茶', price: 150, stock: 0, },
    { name: 'ほうじ茶', price: 100, stock: 0, },
]
const db = require('../lib/db');
db.inserts('items', posts);