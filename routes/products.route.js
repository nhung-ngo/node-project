"use strict";
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// Main GET /products route with flexible filters
router.get("/", (req, res) => {
  const { search, category, description, phone } = req.query;

  if (search) {
    // GET http://localhost:3000/products?search=crystal
    productsController.getProductsBySearch(req, res);
  } else if (phone || category) {
    // GET http://localhost:3000/products?category=leather 
    productsController.getProductsByCategory(req, res);
  } else if (phone && description){
    // GET http://localhost:3000/products?description=shockproof&phone=galaxy
    productsController.getProductsByPhoneAndDescription(req, res);  
  } else {
    // GET http://localhost:3000/products
    productsController.getAllProducts(req, res);
  }
});

// GET http://localhost:3000/products/1
router.get("/:id", productsController.getProductById);

module.exports = router;
