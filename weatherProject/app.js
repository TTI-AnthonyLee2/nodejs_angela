const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=hualien&appid=ac4f2f102562d6d3c77d2e48eb633d3c&mode=json&units=metric';
    
    https.get(url, httpsRes => {
        console.log(httpsRes.statusCode);
        console.log(httpsRes.headers);

        httpsRes.on('data', data => {
            const weatherData = JSON.parse(data);

            res.send(data);
        })
    });

    // res.send('Server is running!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});