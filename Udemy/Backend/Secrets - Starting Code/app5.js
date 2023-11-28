import dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

const secretKey = process.env.SECRET; 
const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});
db.connect();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
 
let users = [
  { id: 1, email: "ana_titeche@yahoo.com", password: "test123" },
];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
        const result = await db.query("SELECT email, password FROM users WHERE email=($1)", [email]);
        const user = result.rows[0];
        console.log(user);
        bcrypt.compare(password, user.password, function(err, result) {
            if (result === true) {
                res.render("secrets.ejs");
            } 
        });
    } catch (err) {
        console.log(err.message);
    };
})

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const email = req.body.username;
    const password = hash;
    try {
        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
        res.render("secrets.ejs");
    } catch (err) {
        console.log(err.message);
    };
    });
    
    
})


app.listen(3000, function() {
    console.log(`Server started on port ${port}`);
});