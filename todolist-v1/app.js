const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let page = "";
const defaultList = ["Learn Vue", "Learn React", "Learn Angular"];
let list = [...defaultList];
let workList = [];

app.route("/")
    .get((req, res) => {
        page = "";

        const today = new Date();
        const dateOptions = {
            weekday: "long",
            day: "numeric",
            month: "long",
        };

        const day = today.toLocaleDateString("en-US", dateOptions);
        
        // Use Embedded JavaScript templating (EJS)
        res.render("list", {page: page, listTitle: day, todoList: list});

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

app.route("/work")
    .get((req, res) => {
        page = "work";
        res.render("list", {page: page, listTitle: "Work List", todoList: workList});
    })
    .post((req, res) => {
        const newItem = req.body.newItem;
        workList.push(newItem);
        res.redirect("/work");
    });
    
app.route("/about")
    .get((req, res) => {
        res.render("about");
    })

app.listen(3000, () => {
    console.log("Server is opening on port 3000.");
});