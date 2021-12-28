const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // console.log(req);
    res.send('Links to <a href="https://www.windy.com/?25.050,121.532,5">Windy</a>');
});

app.get('/about', (req, res) => {
    // console.log(req);
    res.send(`
        <h1>I am Anthony</h1>
        <p>I am 18 years old. What about you? haha!</p>
    `);
});

app.listen(3000, () => {
    console.log('Server started on port 3000.');
});