import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

export const createBook = async (bookData) => {
  const response = await api.post("/api/books", bookData);
  return response.data;
};

export const getBooks = async () => {
  const response = await api.get("/api/books");
  return response.data;
};

export const getMyBooks = async () => {
  const response = await api.get("/api/books/my-books");
  return response.data;
};
