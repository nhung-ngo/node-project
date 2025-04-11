"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

// POST http://localhost:3000/cart/add
router.post("/add", cartController.addToCart);

// GET http://localhost:3000/cart/:userID
router.get("/:userID", cartController.getCartByUser);

// DELETE http://localhost:3000/cart/remove/:productID
router.delete("/remove/:productID", cartController.removeFromCart);

// POST http://localhost:3000/cart/checkout
router.post("/checkout", cartController.checkoutCart);



module.exports = router;
