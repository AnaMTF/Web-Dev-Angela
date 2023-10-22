import express from "express";
import ejs, { render } from "ejs";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const today = new Date();
    const day = today.getDay();

    //console.log(day);
    let type = "a weekday";
    let adv = "you should be working!";

    if (day === 0 || day === 6) {
        type = "the weekend";
        adv = "you can relax now!";
    } else {
        type = "a weekday";
        adv = "you should be working!";
    }

    res.render("index.ejs", {
        dayType: type,
        advice: adv,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
