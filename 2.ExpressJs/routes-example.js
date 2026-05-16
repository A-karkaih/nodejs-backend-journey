const express = require("express");
const app = express();

// root route
app.get("/", (req, res) => {
  res.send("Welcome to our home page");
});

//get all products
app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "Product 3",
    },
  ];
  res.send(products);
});

//get a single product
app.get("/products/:Id", (req, res) => {
  const id = parseInt(req.params.Id);
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "Product 3",
    },
  ];
  const product = products.find((product) => product.id == id);
  if (!product) {
    return res.status(400).send("Product not found try with different id ");
  }
  res.status(200).send(product);
});

// listening to port
const Port = 3000;
app.listen(Port, () => {
  console.log(`The server is running at port :  ${Port}`);
});
