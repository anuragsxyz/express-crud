const Prodcut = require("./models/product");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("connected to the db");
  })
  .catch((e) => {
    console.log("connection error with the database", e);
  });

// const p = new Prodcut({
//   name: "Grape",
//   price: 99,
//   category: "fruits",
// });

// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const seedproducts = [
  {
    name: "Grape",
    price: 99,
    category: "fruits",
  },
  {
    name: "orange",
    price: 99,
    category: "fruits",
  },
  {
    name: "Tomato",
    price: 1099,
    category: "vegetables",
  },
  {
    name: "Olive",
    price: 9923,
    category: "fruits",
  },

  {
    name: "Egg Plant",
    price: 992,
    category: "fruits",
  },
  {
    name: "Chilli",
    price: 93223,
    category: "vegetables",
  },
  {
    name: "Milk",
    price: 26,
    category: "dairy",
  },
  {
    name: "Mango  ",
    price: 20,
    category: "fruits",
  },
];

Prodcut.insertMany(seedproducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
