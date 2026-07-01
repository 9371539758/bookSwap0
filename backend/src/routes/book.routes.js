const express = require("express");
const bookRouter = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  createBook,
  getBooks,
  getMyBooks,
} = require("../controllers/book.controller");

bookRouter.post("/", verifyToken, createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/my-books", verifyToken, getMyBooks);

module.exports = bookRouter;
