import dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

import passport from "passport";
import localPassport from "passport-local";
import session from "express-session";

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
   
})

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", async (req, res) => {
    
    
    
})


app.listen(3000, function() {
    console.log(`Server started on port ${port}`);
});