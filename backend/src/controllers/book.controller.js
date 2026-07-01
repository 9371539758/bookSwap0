const Book = require("../model/book.model");

const createBook = async (req, res) => {
  try {
    const { title, author, price, description, coverImage, available } =
      req.body;
    const seller = req.user?.id;

    if (!seller) {
      return res
        .status(401)
        .json({ message: "Unauthorized: seller not found" });
    }

    if (!title || !author || price === undefined) {
      return res
        .status(400)
        .json({ message: "title, author, and price are required" });
    }

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      price,
      description: description?.trim(),
      coverImage: coverImage?.trim() || "",
      available: available !== undefined ? available : true,
      seller,
    });

    res.status(201).json({ message: "book created successfully", book });
  } catch (error) {
    console.error("Create book error:", error);
    res.status(500).json({ message: error.message || "Could not create book" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ available: true }).populate(
      "seller",
      "username email",
    );
    res.status(200).json({ books });
  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({ message: error.message || "Could not fetch books" });
  }
};

const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user.id }).populate(
      "seller",
      "username email",
    );
    res.status(200).json({ books });
  } catch (error) {
    console.error("Get my books error:", error);
    res
      .status(500)
      .json({ message: error.message || "Could not fetch your books" });
  }
};

module.exports = {
  createBook,
  getBooks,
  getMyBooks,
};
