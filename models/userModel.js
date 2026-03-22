const db = require("../config/db");

exports.createUser = (user, callback) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [user.name, user.email, user.password], callback);
};

exports.findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};
