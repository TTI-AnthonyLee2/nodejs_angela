const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

let list = ["Learn Vue", "Learn React", "Learn Angular"];

app.route("/")
    .get((req, res) => {
        const today = new Date();
        const dateOptions = {
            weekday: "long",
            day: "numeric",
            month: "long",
        };

        // Use Embedded JavaScript templating (EJS)
        const day = today.toLocaleDateString("en-US", dateOptions);

        res.render("list", {kindOfDay: day, todoList: list});

        // Use sendFile method, but it's a hardcode
        // res.sendFile(`${__dirname}/index.html`, err => {
        //     console.log(`send file err: ${err}`);
        // });
    })
    .post((req, res) => {
        const newItem = req.body.newItem;
        list.push(newItem);
        res.redirect("/");
    });

app.listen(3000, () => {
    console.log("Server is opening on port 3000.");
});