const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();

// set the View engine as ejs
app.set("view engine", "ejs");

//set the directory for the views
app.set("views", path.join(__dirname, "views"));
console.log(__dirname);

const products = [
  {
    id: 1,
    title: "Product1",
  },
  {
    id: 2,
    title: "Product2",
  },
  {
    id: 3,
    title: "Product3",
  },
];

app.get("/", (req, res) => {
  res.render("home", { title: "Home", products: products });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.listen(3000, () => {
  console.log("Server is running");
});
