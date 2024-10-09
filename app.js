const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");

//connect to the database in app file
const mongoose = require("mongoose");
const Prodcut = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("connected to the db");
  })
  .catch((e) => {
    console.log("connection error with the database", e);
  });

//MIDDLEWARE
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("I love u");
});

app.get("/products", async (req, res) => {
  const products = await Prodcut.find({});

  res.render("products/index", { products });
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

// use body parser to get data - middleware
app.post("/products", async (req, res) => {
  const { name, price, category } = req.body;
  const newProductCreated = new Prodcut(req.body);
  await newProductCreated
    .save()
    .then((response) => {
      console.log("product added", response);
    })
    .catch((e) => {
      console.log(e);
    });
  res.redirect("products");
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Prodcut.findById(id);
  console.log(product);

  res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Prodcut.findById(id);
  // console.log(product);

  res.render("products/edit", { product });
});
//PUT REQUEST TO UPDATE
app.put("/products/:id/", async (req, res) => {
  const { id } = req.params;
  const product = await Prodcut.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });

  // res.render("products/edit", { product });
  res.redirect(`/products/${product._id}`);
});

app.listen(3000, () => {
  console.log(`Port Open at ${port}`);
});
