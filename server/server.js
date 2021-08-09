const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const secrets = require("./secrets");
const cookieSession = require("cookie-session");
const encrypt = require("./encrypt");
const cryptoRandomString = require("crypto-random-string");
const multer = require("multer");
const uidSafe = require("uid-safe");
const ses = require("./ses");
const s3 = require("./s3");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

const secretCode = cryptoRandomString({
    length: 6,
});

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

app.get("/logout", function (req, res) {
    (req.session.userId = null), (req.session.first = null);
    res.redirect("/");
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const { rows } = await db.getUser(req.params.id);
        console.log("rows[0]: ", rows[0]);

        res.json(rows[0]);
    } catch (error) {
        console.log;
    }
});

app.post("/register", (req, res) => {
    console.log("you are here: ");
    const { first, last, email, password } = req.body;

    encrypt
        .hash(password)
        .then((hashed) => {
            console.log("hashed: ", hashed);

            db.addUser(first, last, email, hashed)
                .then(({ rows: user }) => {
                    console.log("user: ", user);

                    console.log("user ID ", user[0].id);
                    req.session.userId = user[0].id;
                    req.session.first = first;

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

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.loginUser(email, password)

        .then(({ rows: user }) => {
            console.log("user: ", user);
            if (user.length === 0) {
                res.json({ success: false });
            } else {
                encrypt
                    .compare(password, user[0].hashed_password)
                    .then((logged) => {
                        console.log("logged: ", logged);

                        if (logged) {
                            req.session.userId = user[0].id;
                            req.session.first = user[0].first;
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch((err) => {
                        console.log("err in compare: ", err);
                        res.json({ success: false });
                    });
            }
        })
        .catch((err) => {
            console.log("err in loginUser: ", err);
            res.json({ success: false });
        });
});

app.get("/user", (req, res) => {
    db.getUser(req.session.userId)
        .then(({ rows: user }) => {
            res.json(user[0]);
        })
        .catch((err) => {
            console.log("err: ", err);
            return err;
        });
});

app.post(
    "/uploadAvatar",
    uploader.single("file"),
    s3.upload,
    function (req, res) {
        // If nothing went wrong the file is already in the uploads directory
        // console.log("req.file: ", req.file);
        console.log("Here we are!: ");

        if (req.file) {
            console.log("req.file: ", req.file);
            const avatar = `https://newimageboardapp.s3.amazonaws.com/${req.file.filename}`;
            console.log("avatar: ", avatar);

            db.updateAvatar(req.body.userId, avatar).then(
                ({ rows: avatar }) => {
                    console.log("avatar: ", avatar);

                    res.json(avatar[0]);
                }
            );
        } else {
            res.json({
                success: false,
            });
        }
    }
);

app.post("/updateBio", async (req, res) => {
    // If nothing went wrong the file is already in the uploads directory
    // console.log("req.file: ", req.file);
    console.log("Here we are!: ", req.body);
    try {
        const { rows: bio } = await db.updateBio(
            req.session.userId,
            req.body.draftBio
        );

        res.json(bio);
    } catch (error) {
        console.log;
    }
});

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    console.log("secretCode: ", secretCode);
    db.loginUser(req.body.email)
        .then(async ({ rows: user }) => {
            console.log("user: ", user);
            if (user.length === 0) {
                res.json({
                    success: false,
                });
            } else {
                const saveCode = await db.addCode(email, secretCode);
                const code = saveCode.rows[0].code;
                console.log("code: ", code);

                ses.sendEmail(code)
                    .then(() => {
                        console.log("it worked!");
                        res.json({ success: true });
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => {
            console.log("err in loginUser: ", err);
            res.json({ success: false });
        });
});

// app.post("/password/reset/verify", (req, res) => {
//     const { email } = req.body;

//     db.loginUser(req.body.email)
//         .then(({ rows: user }) => {
//             console.log("user: ", user);
//             if (user.length === 0) {
//                 res.json({
//                     success: false,
//                 });
//             } else {
//                 res.json({ success: true });
//             }
//         })
//         .catch((err) => {
//             console.log("err in loginUser: ", err);
//             res.json({ success: false });
//         });
// });

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
