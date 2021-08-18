DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;


 CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL,
    last VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    avatar VARCHAR,
    bio VARCHAR,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL REFERENCES users(email),
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

   CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL,
   recipient_id INT REFERENCES users(id) NOT NULL,
   accepted BOOLEAN DEFAULT false
   );
   
   CREATE TABLE messages(
   id SERIAL PRIMARY KEY,
   text VARCHAR NOT NULL,
   user_id INT REFERENCES users(id) NOT NULL,
   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   INSERT INTO messages VALUES ('Testing the chat', '1')