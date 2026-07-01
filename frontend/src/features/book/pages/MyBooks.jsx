import { useEffect, useState } from "react";
import { getMyBooks } from "../services/book.api";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyBooks();
        setBooks(data.books || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Could not load your books");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="auth-page">Loading your books...</div>;
  }

  return (
    <div className="auth-page my-books-page">
      <div className="auth-panel">
        <div className="auth-form-inner">
          <h1 className="auth-heading">My Books</h1>
          {error && <div className="error-box">{error}</div>}
          {books.length === 0 ? (
            <p>No books added yet.</p>
          ) : (
            books.map((book) => (
              <div className="book-card" key={book._id}>
                {book.coverImage && (
                  <img src={book.coverImage} alt={book.title} className="book-cover" />
                )}
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Price: ${book.price.toFixed(2)}</p>
                  <p>{book.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
