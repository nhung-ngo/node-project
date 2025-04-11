"use strict";
const db = require("../models/db-conn");

function getAll(rep, res) {
  try {
    const users = db.all("SELECT * FROM Users");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

function getOneById(req, res) {
  try {
    const userID = req.params.id;
    const user = db.get("SELECT * FROM Users WHERE userID = ?", userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

function createUser(req, res) {
    try {
      const { name, email, password, user_type } = req.body;
      const created_at = new Date().toISOString();
  
      if (!name || !email || !password || !user_type) {
        return res.status(400).json({ error: "Missing required fields." });
      }
  
      const sql = `
        INSERT INTO Users (name, email, password, user_type, created_at)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      db.run(sql, name, email, password, user_type, created_at);
  
      res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      console.error("DB error:", err.message);
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ error: "Email already exists." });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  }
  
  

module.exports = {
  getAll,
  getOneById,
  createUser
};
