const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
    const params = req.body;
    console.log(params);
    const category = params.cat;
    const type = params.type === 'both' ? '' : params.type;
    const keyword = params.keyword;
    const url = `https://v2.jokeapi.dev/joke/${category}?type=${type}&contains=${keyword}`;

    https.get(url, httpsRes => {
        httpsRes.on('data', data => {
            const jokeData = JSON.parse(data);
            const type = jokeData.type;

            if (type === 'single') {
                const joke = jokeData.joke;
                res.write(`<p>${joke}</p>`);
            } else {
                const setup = jokeData.setup;
                const delivery = jokeData.delivery;
                res.write(`<p>${setup}</p>`);
                res.write(`<p>${delivery}</p>`);
            }
            res.send();
        })
    });
});

app.listen(3000);