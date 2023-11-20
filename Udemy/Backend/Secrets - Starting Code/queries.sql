CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users2 (

id SERIAL PRIMARY KEY,

username TEXT,

password BYTEA

);

INSERT INTO users2 (username, password)

VALUES ('user1', pgp_sym_encrypt('testpassword', 'secretkey')

);

SELECT username, pgp_sym_decrypt(password, 'secretkey')

AS password

FROM users2