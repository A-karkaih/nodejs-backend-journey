const express = require("express");
// imports all functions
const {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/book-controller");
//create express router
const router = express.Router();

// all routes that are related to books

// get
router.get("/get", getAllBooks);
router.get("/get/:id",getBook);

// post
router.post("/add",addBook);

// put
router.put("/update/:id",updateBook);

// delete
router.delete("/delete/:id",deleteBook);

// export router

module.exports = router ;