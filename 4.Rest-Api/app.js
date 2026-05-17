const express = require("express");
const { title } = require("node:process");
const app = express();

//Middleware
app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book 1",
  },
  {
    id: 2,
    title: "Book 2",
  },
  {
    id: 3,
    title: "Book 3",
  },
];
//into route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api ",
  });
});

//get all books
app.get("/get", (req, res) => {
  res.status(200).json({
    books,
  });
});

//get a single book
app.get("/get/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);

  const book = books.find((bookItem) => bookItem.id === bookId);
  if (!book) {
    return res.status(404).json({
      message: "There is no book with this id,Please choose another id ",
    });
  }
  res.status(200).json({
    book,
  });
});

//add new book
app.post("/add", (req, res) => {
  const id = Date.now() + Math.floor(Math.random() * 1000);

  const newBook = {
    id,
    title: `Books ${id}`,
  };
  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "New book is added",
  });
});

//update book
app.put("/update/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);

  const currentBook = books.find((bookItem) => bookItem.id === bookId);
  if (!currentBook) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  currentBook.title = req.body.title || currentBook.title;

  res.status(200).json({
    data: currentBook,
    message: "The book is updated",
  });
});

//delete book
app.delete("/delete/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const bookIndex = books.findIndex((item) => item.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }
  const deletedBook = books.splice(bookIndex, 1);
  res.status(200).json({
    data: deletedBook[0],
    message: "The book is deleted",
  });
});

//starting server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is now running on port number", PORT);
});
