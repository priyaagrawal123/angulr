
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";

// const ManageBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [form, setForm] = useState({
//     authorName: "",
//     title: "",
//     genre: "",
//     publishedYear: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // Fetch books from Open Library API
//   const fetchBooks = async (searchTitle = "the lord of the rings") => {
//     try {
//       const response = await axios.get(
//         `http://openlibrary.org/search.json?title=${searchTitle}`
//       );
//       const fetchedBooks = response.data.docs.slice(0, 10).map((book) => ({
//         id: book.key,
//         authorName: book.author_name ? book.author_name[0] : "Unknown",
//         title: book.title,
//         genre: book.subject ? book.subject[0] : "Unknown",
//         publishedYear: book.first_publish_year || "Unknown",
//       }));
//       setBooks(fetchedBooks);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   // Add a new book
//   const addBook = () => {
//     const newBook = {
//       id: Date.now().toString(),
//       ...form,
//     };
//     setBooks((prevBooks) => [...prevBooks, newBook]);
//     alert("Book added successfully!"); // Alert message
//     resetForm();
//   };

//   // Update an existing book
//   const updateBook = () => {
//     setBooks((prevBooks) =>
//       prevBooks.map((book) =>
//         book.id === editingId ? { ...book, ...form } : book
//       )
//     );
//     alert("Book updated successfully!"); // Alert message
//     resetForm();
//   };

//   // Delete a book
//   const deleteBook = (id) => {
//     setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
//     alert("Book deleted successfully!"); // Alert message
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       updateBook();
//     } else {
//       addBook();
//     }
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Handle edit button click
//   const handleEdit = (book) => {
//     setForm(book);
//     setIsEditing(true);
//     setEditingId(book.id);
//     setShowForm(true);
//   };

//   // Reset form and close popup
//   const resetForm = () => {
//     setForm({
//       authorName: "",
//       title: "",
//       genre: "",
//       publishedYear: "",
//     });
//     setIsEditing(false);
//     setEditingId(null);
//     setShowForm(false);
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <Navbar />

//       <div className="p-6">
//         <h1 className="text-3xl text-blue-800 font-bold mb-24 text-center">
//           Manage Books
//         </h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 absolute right-12 top-44"
//         >
//           Add Book
//         </button>

//         <table className="min-w-full bg-white shadow-md rounded">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2">Author Name</th>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Genre</th>
//               <th className="px-4 py-2">Published Year</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.id} className="border-b">
//                 <td className="px-4 py-2">{book.authorName}</td>
//                 <td className="px-4 py-2">{book.title}</td>
//                 <td className="px-4 py-2">{book.genre}</td>
//                 <td className="px-4 py-2">{book.publishedYear}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleEdit(book)}
//                     className="text-blue-500 hover:text-blue-700 mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteBook(book.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Popup form for adding/editing books */}
//         {showForm && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-md w-1/3">
//               <h2 className="text-2xl font-bold mb-4">
//                 {isEditing ? "Edit Book" : "Add Book"}
//               </h2>
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="authorName"
//                   value={form.authorName}
//                   onChange={handleChange}
//                   placeholder="Author Name"
//                   className="border p-2 w-full mb-2 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="title"
//                   value={form.title}
//                   onChange={handleChange}
//                   placeholder="Title"
//                   className="border p-2 w-full mb-2 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="genre"
//                   value={form.genre}
//                   onChange={handleChange}
//                   placeholder="Genre"
//                   className="border p-2 w-full mb-2 rounded"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="publishedYear"
//                   value={form.publishedYear}
//                   onChange={handleChange}
//                   placeholder="Published Year"
//                   className="border p-2 w-full mb-4 rounded"
//                   required
//                 />
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   >
//                     {isEditing ? "Update Book" : "Add Book"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageBooks;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    genre: "",
    publishedYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    fetchBooks();
}, []);

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/books");
    console.log("Books fetched:", response.data); // Log the response to check the data structure
    // Ensure the data is an array before attempting to map over it
    if (Array.isArray(response.data)) {
      setBooks(response.data); // Assuming the response has a 'data' object containing the books
    } else {
      console.error("Data is not in expected array format");
      setBooks([]); // Fallback in case the response is not an array
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    setBooks([]); // Ensure books is always an array
  }
};


  // Add a new book
  const addBook = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/books", form);
      setBooks((prevBooks) => [...prevBooks, response.data.data]);
      alert("Book added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update an existing book
  const updateBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/books/${editingId}`,
        form
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingId ? { ...book, ...form } : book
        )
      );
      alert("Book updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateBook();
    } else {
      addBook();
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle edit button click
  const handleEdit = (book) => {
    setForm(book);
    setIsEditing(true);
    setEditingId(book.id);
    setShowForm(true);
  };

  // Reset form and close popup
  const resetForm = () => {
    setForm({
      authorName: "",
      title: "",
      genre: "",
      publishedYear: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl text-blue-800 font-bold mb-24 text-center">
          Manage Books
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 absolute right-12 top-44"
        >
          Add Book
        </button>

        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
            <th className="px-4 py-2">S.No</th> {/* Serial Number Column */}
              <th className="px-4 py-2">Author Name</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">Published Year</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
  {books.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center py-4">No books available</td>
    </tr>
  ) : (
    books.map((book,index) => (
      <tr key={book.id} className="border-b">
         <th className="px-4 py-2">{index+1}</th> {/* Serial Number Column */}
        <td className="px-4 py-2">{book.authorName}</td> {/* Corrected field */}
        <td className="px-4 py-2">{book.title}</td>
        <td className="px-4 py-2">{book.genre}</td>
        <td className="px-4 py-2">{book.publishedYear}</td>
        <td className="px-4 py-2">
          <button
            onClick={() => handleEdit(book)}
            className="text-blue-500 hover:text-blue-700 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteBook(book.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
</table>

        {/* Popup form for adding/editing books */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Book" : "Add Book"}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.authorName}
                  onChange={handleChange}
                  placeholder="Author Name"
                  className="border p-2 w-full mb-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="border p-2 w-full mb-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="Genre"
                  className="border p-2 w-full mb-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="publishedYear"
                  value={form.publishedYear}
                  onChange={handleChange}
                  placeholder="Published Year"
                  className="border p-2 w-full mb-4 rounded"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {isEditing ? "Update Book" : "Add Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
