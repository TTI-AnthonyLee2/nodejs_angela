const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post('/', (req, res) => {
    console.log(req.body);
    const fisrtName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fisrtName,
                    LNAME: lastName
                }
            }
        ],
        update_existing: false
    };

    const jsonData = JSON.stringify(data);

    const listId = '7611737cf4';
    const apiKey = 'd8962cec21454168c17ab80a9ca61918-us20';
    const url = `https://us20.api.mailchimp.com/3.0/lists/${listId}`;

    const options = {
        method: 'post',
        auth: `anthony1:${apiKey}` // username: API key
    };

    const httpsReq = https.request(url, options, httpsRes => {
        console.log(httpsRes.statusCode);
        if (httpsRes.statusCode === 200) {
            res.sendFile(`${__dirname}/success.html`);
        } else {
            res.sendFile(`${__dirname}/failure.html`);
        }

        console.log(httpsRes.statusMessage);
        httpsRes.on('data', data => {
            console.log(JSON.parse(data));
        });
    });

    httpsReq.write(jsonData);
    httpsReq.end();

    // res.write(`<p>First name: ${fisrtName}</p>`);
    // res.write(`<p>Last name: ${lastName}</p>`);
    // res.write(`<p>Email: ${email}</p>`);

    // res.send();
});

app.post('/failure', (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('server is running on port 3000.');
});