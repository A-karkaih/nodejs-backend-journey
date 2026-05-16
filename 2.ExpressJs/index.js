const express = require("express");

const app = express();

const Port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.listen(Port, () => {
  console.log(`The server is running at port :  ${Port}`);
});
