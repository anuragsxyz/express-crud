const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//connect to the database in app file
const mongoose = require("mongoose");
const Prodcut = require("./models/product");
const { log } = require("console");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("connected to the db");
  })
  .catch((e) => {
    console.log("connection error with the database", e);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("I love u");
});

app.get("/products", async (req, res) => {
  const products = await Prodcut.find({});

  res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Prodcut.findById(id);
  console.log(product);

  res.render("products/show", { product });
});

app.listen(3000, () => {
  console.log(`Port Open at ${port}`);
});
