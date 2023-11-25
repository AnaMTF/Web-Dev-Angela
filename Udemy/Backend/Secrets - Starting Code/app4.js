import dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";
import md5 from "md5";

const app = express();
const port = 3000;


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
    const password = md5(req.body.password);
    try {
        const result = await db.query("SELECT username, pgp_sym_decrypt(password, ($1)) AS password FROM users2 WHERE username=($2)", [secretKey, email]);
        const user = result.rows[0];
        console.log(user);
        if (user.password == password) {
            res.render("secrets.ejs");
        };
    } catch (err) {
        console.log(err.message);
    };
})

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = md5(req.body.password);
    try {
        await db.query("INSERT INTO users2 (username, password) VALUES ($1, pgp_sym_encrypt(($2), ($3)))", [email, password, secretKey]);
        res.render("secrets.ejs");
    } catch (err) {
        console.log(err.message);
    };
    
})


app.listen(3000, function() {
    console.log(`Server started on port ${port}`);
});