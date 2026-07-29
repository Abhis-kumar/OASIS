const db = require("../config/db");

// Find user by username
const findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE username = ?",
            [username],
            (err, row) => {
                if (err) return reject(err);
                resolve(row);
            }
        );
    });
};

// Find user by email
const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, row) => {
                if (err) return reject(err);
                resolve(row);
            }
        );
    });
};


// Find user by username OR email
const findByUsernameOrEmail = (login) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [login, login],
            (err, row) => {
                if (err) return reject(err);
                resolve(row);
            }
        );
    });
};

// Create new user
const createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO users(username,email,password) VALUES(?,?,?)",
            [username, email, password],
            function (err) {
                if (err) return reject(err);

                resolve({
                    id: this.lastID,
                    username,
                    email
                });
            }
        );
    });
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT id, username, email, created_at FROM users WHERE id = ?`,
            [id],
            (err, row) => {
                if (err) return reject(err);
                resolve(row);
            }
        );
    });
};

module.exports = {
    findByUsername,
    findByEmail,
    findByUsernameOrEmail,
    createUser,
    findUserById
};