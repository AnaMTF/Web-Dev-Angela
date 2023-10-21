import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello there :3</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Me</h1><p>I'm a programmer.</p>");
});

app.get("/contact", (req, res) => {
    res.send(
        "<h1>Contact Me</h1><P>My email is:anamaria.titeche@gmail.com</p>"
    );
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
