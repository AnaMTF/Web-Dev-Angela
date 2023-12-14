import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import GoogleStrategy from 'passport-google-oauth20';
 
 
const db = new pg.Client({
  user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT,
});
 
db.connect();
 
const app = express();
const port = 3000;
const saltRounds = 10;
let currentUserId;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
 
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
 
 
// =============================== PASSPORT STRATEGIES ================================
 
passport.use('local-register', new LocalStrategy(async (username, password, cb) => {
  try {
    const hash_password = (await db.query("SELECT password FROM users WHERE username = $1", [username])).rows;
    if (hash_password.length > 0) {
      return cb(null, false, { message: 'User already exists!' });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          return cb(err);
        } else {
          db.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, hash]);
          return cb(null, true);
        };
      });
    };
  } catch (err) {
    return cb(err);
  };
}));
 
passport.use('local-login', new LocalStrategy(async (username, password, cb) => {
  try {
    const hash_password = (await db.query("SELECT * FROM users WHERE username = $1", [username])).rows;
    if (hash_password === 0) {
      return cb(null, false, { message: 'User or password is incorrect!' });
    };
    bcrypt.compare(password, hash_password[0].password, (err, result) => {
      if (err) {
        return cb(err);
      };
      if (!result) {
        return cb(null, false, { message: 'User or password is incorrect!' });
      } else {
        currentUserId = Number(hash_password[0].id);
        return cb(null, result);
      };
    });
  } catch (err) {
    return cb(err);
  };
}));
 
// =============================== PASSPORT STRATEGIES ================================
 
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});
 
passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user);
  });
});
 
 
// =============================== GOOGLE STRATEGIES ================================
 
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/secrets',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback: true
},
  async (req, accessToken, refreshToken, profile, cb) => {
    try {
      const result = (await db.query("SELECT * FROM google_users WHERE id = $1", [profile.id])).rows;
      if(result.length === 0) {
        const addUser = await db.query("INSERT INTO google_users (id, first_name, last_name) VALUES ($1, $2, $3)", [profile.id, profile.name.givenName, profile.name.familyName]);
        return cb(null, addUser)
      } else {
        return cb(null, result)
      }
    } catch (err) {
      return cb(err);
    }
  }
));
 
// =============================== GOOGLE STRATEGIES ================================
 
app.get("/", (req, res) => {
  res.render("home.ejs");
});
 
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
 
app.post("/login", passport.authenticate("local-login", {
  successRedirect: '/secrets',
  failureRedirect: '/login'
}));
 
app.get("/auth/google", passport.authenticate('google', {
  scope: ['profile']
}));
 
app.get("/auth/google/secrets", passport.authenticate('google', {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));
 
app.get("/register", async (req, res) => {
  res.render("register.ejs");
});
 
app.post("/register", passport.authenticate("local-register", {
  successRedirect: '/secrets',
  failureRedirect: '/register'
}));
 
app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  };
});
 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 