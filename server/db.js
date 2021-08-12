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

module.exports.getUser = (id) => {
    return db.query(
        `SELECT id, first, last, email, bio, avatar FROM users WHERE id=($1)`,
        [id]
    );
};

module.exports.addCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1,$2) RETURNING email, code, id`,
        [email, code]
    );
};

module.exports.updateAvatar = (userId, avatar) => {
    return db.query(
        `UPDATE users SET avatar=($2) WHERE id=($1) RETURNING avatar`,
        [userId, avatar]
    );
};

module.exports.updateBio = (userId, bio) => {
    return db.query(`UPDATE users SET bio=($2) WHERE id=($1) RETURNING bio`, [
        userId,
        bio,
    ]);
};

module.exports.getLatestUsers = () => {
    return db.query(
        `SELECT id, first, last, avatar, bio FROM users ORDER BY id DESC LIMIT 4`
    );
};

module.exports.findPeople = (searchTerm) => {
    return db.query(
        `SELECT id, first, last, avatar FROM users WHERE (first || ' ' || last) ILIKE $1 ORDER BY id ASC LIMIT 10`,
        [searchTerm + "%"]
    );
};

module.exports.checkFriendship = (userId, otherUserId) => {
    return db.query(
        `SELECT * 
        FROM friendships 
        WHERE (recipient_id = $2 AND sender_id = $1) 
        OR (recipient_id = $1 AND sender_id = $2)`,
        [userId, otherUserId]
    );
};

module.exports.addFriendship = (sender_id, recipient_id) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1,$2) RETURNING id, accepted`,
        [sender_id, recipient_id]
    );
};

module.exports.deleteFriendship = (friendship_id) => {
    return db.query(`DELETE FROM friendships WHERE id=$1`, [friendship_id]);
};
