const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// simple calculator
app.get('/', (req, res) => {
    // res.send(`Hello World!`);
    console.log(__dirname); // This will get absolute path.
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
    console.log(req.body);

    const n1 = Number(req.body.num1);
    const n2 = Number(req.body.num2);
    const result = n1 + n2;

    res.send(`The result of calculation is ${result}`);
    // res.send('Thanks for posting that!');
});

// bmi calculator
app.get('/bmicalculator', (req, res) => {
    res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post('/bmicalculator', (req, res) => {
    const w = Number(req.body.w); // kg
    const h = Number(req.body.h) / 100; // meter
    const bmi = (w / h**2).toFixed(2);

    res.send(`Your BMI is ${bmi}`);
});

// start a server
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});