const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const secrets = require("./secrets.json");
const cookieSession = require("cookie-session");
const encrypt = require("./encrypt");

app.use(
    cookieSession({
        secret: process.env.COOKIE_SECRET || secrets.COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register", (req, res) => {
    console.log("you are here: ");

    encrypt
        .hash(req.body.password)
        .then((hashed) => {
            console.log("hashed: ", hashed);

            db.addUser(req.body.first, req.body.last, req.body.email, hashed)
                .then(({ rows: user }) => {
                    console.log("user: ", user);

                    console.log("user ID ", user[0].id);
                    req.session.userId = user[0].id;
                    req.session.first = req.body.first;

                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("err in /addUser: ", err.constraint);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in hash: ", err);
            res.json({ success: false });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
