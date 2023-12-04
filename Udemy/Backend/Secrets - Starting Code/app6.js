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
  port: process.env.PORT,
});
db.connect();

const localStrategy = localPassport.Strategy;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use("local-register", new localStrategy(async (username, password, done) => {
  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    const user = result.rows[0];
    if(user!=undefined){
      return done(null, false, {message: "Email already registered"});
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [username, hashedPassword]);
      const newResult = await db.query("SELECT * FROM users WHERE email = $1", [username]);
      const newUser = newResult.rows[0];
      return done(null, newUser);
    }
  }
  catch(e){
    return done(e, false);
  }
}));
 passport.use("local-login",new localStrategy(async (username,password,done)=>{
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1",[username]);
        const user = result.rows[0];
        if(user!==undefined){
            const passCheck = await bcrypt.compare(password, user.password);
            if(passCheck){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        }
        else{
            return done(null, false);
        }
    }
    catch(error){
        return done(error,false);
    }   
}));
 
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async (id,done)=>{
    try{
        const response = await db.query("SELECT * FROM users WHERE id = $1",[id]);
        const user = response.rows[0];
        done(null,user);
    }
    catch (error){
        done(error,false);
    }
});

let users = [
  { id: 1, email: "ana_titeche@yahoo.com", password: "test123" },
];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local-login",{
    failureRedirect: "/login",
    successRedirect: "/secrets",
}));

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", passport.authenticate("local-register",{
    failureRedirect: "/register",
    successRedirect: "/secrets",
}));

app.get("/secrets",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("secrets.ejs");
    }
    else{
        res.redirect("/register");
    }
});

app.get("/logout",(req,res)=>{
    res.clearCookie("connect.sid");    //this will clear the cookies left on client-side
    req.logOut(()=>{
        res.redirect("/");
    });
});

app.listen(3000, function() {
    console.log(`Server started on port ${port}`);
});