"use strict";
const db = require("../models/db-conn");


function addToCart(req, res) {
    try {
      const { userID, productID, quantity } = req.body;
  
      if (!userID || !productID || !quantity) {
        return res.status(400).json({ error: "Missing userID, productID, or quantity" });
      }
  
      let cart = db.get("SELECT * FROM Carts WHERE userID = ? AND status = 'active'", userID);
  
      if (!cart) {
        const timestamp = new Date().toISOString();
        db.run(
          "INSERT INTO Carts (userID, created_at, status) VALUES (?, ?, ?)",
          userID,
          timestamp,
          "active"
        );
        cart = db.get("SELECT * FROM Carts WHERE userID = ? AND status = 'active'", userID);
      }
  
      const cartID = cart.cartID;
  
      const existing = db.get(
        "SELECT * FROM CartProducts WHERE cartID = ? AND productID = ?",
        cartID,
        productID
      );
  
      if (existing) {
        db.run(
          "UPDATE CartProducts SET quantity = quantity + ? WHERE cartID = ? AND productID = ?",
          quantity,
          cartID,
          productID
        );
      } else {
        db.run(
          "INSERT INTO CartProducts (cartID, productID, quantity) VALUES (?, ?, ?)",
          cartID,
          productID,
          quantity
        );
      }
  
      res.status(200).json({ message: "Product added to cart" });
  
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: "Failed to add product to cart" });
    }
  }

  
function removeFromCart(req, res) {
    try {
      const { userID } = req.body;
      const productID = req.params.productID;
  
      if (!userID || !productID) {
        return res.status(400).json({ error: "Missing userID or productID" });
      }
  
      const cart = db.get("SELECT * FROM Carts WHERE userID = ? AND status = 'active'", userID);
      if (!cart) {
        return res.status(404).json({ error: "Active cart not found" });
      }
  
      db.run("DELETE FROM CartProducts WHERE cartID = ? AND productID = ?", cart.cartID, productID);
      res.json({ message: "Product removed from cart" });
  
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: "Failed to remove product" });
    }
  }
  function checkoutCart(req, res) {
    try {
      const { userID } = req.body;
  
      if (!userID) {
        return res.status(400).json({ error: "Missing userID" });
      }
  
      const cart = db.get("SELECT * FROM Carts WHERE userID = ? AND status = 'active'", userID);
      if (!cart) {
        return res.status(404).json({ error: "Active cart not found" });
      }
  
      db.run("DELETE FROM CartProducts WHERE cartID = ?", cart.cartID);
      db.run("UPDATE Carts SET status = 'checked_out' WHERE cartID = ?", cart.cartID);
  
      res.json({ message: "Checkout complete. Cart emptied." });
  
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: "Failed to checkout" });
    }
  }

  function getCartByUser(req, res) {
    try {
      const userID = req.params.userID;
  
      if (!userID) {
        return res.status(400).json({ error: "Missing userID" });
      }
  
      const cart = db.get("SELECT * FROM Carts WHERE userID = ? AND status = 'active'", userID);
      if (!cart) {
        return res.status(404).json({ error: "Active cart not found" });
      }
  
      const products = db.all(
        `SELECT cp.quantity, p.*
         FROM CartProducts cp
         JOIN Products p ON cp.productID = p.productID
         WHERE cp.cartID = ?`,
        cart.cartID
      );
  
      res.json({ cartID: cart.cartID, userID: cart.userID, products });
  
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  }
  
module.exports = {
  addToCart,
  removeFromCart,
  checkoutCart,
  getCartByUser
};
