const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/users.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database Connection Failed:", err.message);
    } else {
        console.log("SQLite Connected");
    }
});

module.exports = db;