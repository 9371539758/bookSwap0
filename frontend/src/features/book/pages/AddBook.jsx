import { useState } from "react";
import { useNavigate } from "react-router";
import { createBook } from "../services/book.api";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !author || price === "") {
      setError("Title, author, and price are required");
      return;
    }

    try {
      setLoading(true);
      const bookPayload = {
        title,
        author,
        price: Number(price),
        description,
        available: true,
      };
      if (coverImage) {
        bookPayload.coverImage = coverImage;
      }

      await createBook(bookPayload);
      setSuccess("Book added successfully");
      setTitle("");
      setAuthor("");
      setPrice("");
      setDescription("");
      setCoverImage("");
      setLoading(false);
      navigate("/my-books");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to add book");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page add-book-page">
      <div className="auth-panel">
        <div className="auth-form-inner">
          <h1 className="auth-heading">Sell a Book</h1>
          <p className="auth-subtext">Add a book listing for buyers to see.</p>

          {error && <div className="error-box">{error}</div>}
          {success && <div className="success-box">{success}</div>}

          <form onSubmit={submitHandler}>
            <div className="field">
              <label>Book title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="field">
              <label>Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="field">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Book cover image</label>
              <input type="file" accept="image/*" onChange={handleFile} />
            </div>
            {coverImage && (
              <div className="field">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              </div>
            )}
            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
