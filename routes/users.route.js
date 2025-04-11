"use strict";
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

// http://localhost:3000/users/all
router.get("/all", usersController.getAll);

// http://localhost:3000/users/3
router.get("/:id", usersController.getOneById);

// http://localhost:3000/users/add
router.post("/add", usersController.createUser);


module.exports = router;
