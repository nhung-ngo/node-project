"use strict";
const db = require("../models/db-conn");

function addProduct(req, res) {
  try {
    const {
      case_name,
      description,
      price,
      stock,
      image_path,
      phone_model,
      categoryID
    } = req.body;

    if (!case_name || !price || !stock || !categoryID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    db.run(
      `INSERT INTO Products (case_name, description, price, stock, image_path, phone_model, categoryID)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      case_name,
      description,
      price,
      stock,
      image_path,
      phone_model,
      categoryID
    );

    res.status(201).json({ message: "Product added successfully" });

  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Failed to add product" });
  }
}

function updateProduct(req, res) {
    try {
      const { productID } = req.params;
  
      const {
        case_name,
        description,
        price,
        stock,
        image_path,
        phone_model,
        categoryID
      } = req.body;
  
      if (!case_name || !price || !stock || !categoryID) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const product = db.get("SELECT * FROM Products WHERE productID = ?", productID);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      db.run(
        `UPDATE Products
         SET case_name = ?, description = ?, price = ?, stock = ?, image_path = ?, phone_model = ?, categoryID = ?
         WHERE productID = ?`,
        case_name,
        description,
        price,
        stock,
        image_path,
        phone_model,
        categoryID,
        productID
      );
  
      res.json({ message: "Product updated successfully" });
  
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: "Failed to update product" });
    }
  }
  
  function bulkUploadProducts(req, res) {
    try {
      const products = req.body;
  
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Expected a non-empty array of products" });
      }
  
      const insert = `
        INSERT INTO Products (case_name, description, price, stock, image_path, phone_model, categoryID)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      for (const product of products) {
        const {
          case_name,
          description,
          price,
          stock,
          image_path,
          phone_model,
          categoryID
        } = product;
  
        if (!case_name || !price || !stock || !categoryID) {
          console.warn("Skipping invalid product:", product);
          continue; // skip invalid entries
        }
  
        db.run(
          insert,
          case_name,
          description,
          price,
          stock,
          image_path,
          phone_model,
          categoryID
        );
      }
  
      res.status(201).json({ message: "Bulk upload complete" });
  
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: "Bulk upload failed" });
    }
  }
  
module.exports = {
  addProduct,
  updateProduct,
  bulkUploadProducts
};
