"use strict";
const db = require("../models/db-conn");

// GET /products → get all
function getAllProducts(req, res) {
  try {
    const products = db.all("SELECT * FROM Products");
    res.json(products);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

// GET /products?search=...
function getProductsBySearch(req, res) {
  try {
    const search = req.query.search;
    if (!search) return res.status(400).json({ error: "Missing search term" });

    const sql = "SELECT * FROM Products WHERE case_name LIKE ?";
    const products = db.all(sql, `%${search}%`);
    res.json(products);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
}

// GET /products?category=leather → by category name
function getProductsByCategory(req, res) {
  try {
    const category = req.query.category;
    if (!category) return res.status(400).json({ error: "Missing category" });

    const sql = `
      SELECT p.*
      FROM Products p
      JOIN Categories c ON p.categoryID = c.categoryID
      WHERE c.case_name LIKE ?
    `;
    const products = db.all(sql, `%${category}%`);
    res.json(products);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Failed to filter by category" });
  }
}

// GET /products?description=shockproof&phone=galaxy
function getProductsByPhoneAndDescription(req, res) {
    try {
      const { phone, description } = req.query;
  
      if (!phone && !description) {
        return res.status(400).json({ error: "Missing phone and/or description" });
      }
  
      let sql = `SELECT * FROM Products WHERE`;
      const params = [];
  
      if (phone) {
        sql += " phone_model LIKE ?";
        params.push(`%${phone}%`);
      }
  
      if (description) {
        if (phone) sql += " AND";
        sql += " description LIKE ?";
        params.push(`%${description}%`);
      }
  
      const products = db.all(sql, ...params);
      res.json(products);
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: "Failed to filter products" });
    }
  }
  

// GET /products/:id
function getProductById(req, res) {
  try {
    const productID = req.params.id;
    const product = db.get("SELECT * FROM Products WHERE productID = ?", productID);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

module.exports = {
  getAllProducts,
  getProductsBySearch,
  getProductsByCategory,
  getProductsByPhoneAndDescription,
  getProductById
};
