import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";
 
const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "userdb",
  password: "papusica123",
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

app.post("/login", function(req, res){
    const email = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = $1 AND password = $2",
        [email, password],
        function(err, result){
            if(err){
                console.log(err);
            } else {
                res.render("secrets");
            }
        }
    )
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const email = req.body.username;
    const password = req.body.password;
    db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password],
        function(err, result){
            if(err){
                console.log(err);
            } else {
                res.render("secrets");
            }
        }
    )
});


app.listen(3000, function() {
    console.log(`Server started on port ${port}`);
});