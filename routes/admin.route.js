"use strict";
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// POST http://localhost:3000/admin/products/add
router.post("/products/add", adminController.addProduct);

// PUT http://localhost:3000/admin/products/3
router.put("/products/:productID", adminController.updateProduct);

// POST http://localhost:3000/admin/products/bulk
router.post("/products/bulk", adminController.bulkUploadProducts);

module.exports = router;
