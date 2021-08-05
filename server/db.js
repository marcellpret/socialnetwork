const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, hashed_password) VALUES ($1,$2,$3,$4) RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.loginUser = (email, password) => {
    return db.query(
        `SELECT id, first, last, hashed_password FROM users WHERE email=($1)`,
        [email]
    );
};

module.exports.addCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1,$2) RETURNING email, code, id`,
        [email, code]
    );
};
