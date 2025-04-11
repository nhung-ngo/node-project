"use strict";
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

const db = require("./models/db-conn");
const usersRoutes = require("./routes/users.route");
app.use("/users", usersRoutes);

const productsRoutes = require("./routes/products.route");
app.use("/products", productsRoutes);

const cartRoutes = require("./routes/cart.route");
app.use("/cart", cartRoutes);

const adminRoutes = require("./routes/admin.route");
app.use("/admin", adminRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});



