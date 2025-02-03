
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";

// function ManageAuthors() {
//   const [authors, setAuthors] = useState([]);
//   const [newAuthor, setNewAuthor] = useState({ name: "", bio: "", year: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingAuthorId, setEditingAuthorId] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   // Fetch authors from the Open Library API
//   useEffect(() => {
//     fetchAuthors();
//   }, []);

//   const fetchAuthors = () => {
//     axios
//       .get("http://openlibrary.org/search.json?author=tolkien")
//       .then((response) => {
//         const authorDocs = response.data.docs.slice(0, 10); // Limit to 10 results
//         const mappedAuthors = authorDocs.map((doc, index) => ({
//           id: index, // Generate a local ID
//           name: doc.author_name?.[0] || "Unknown Author",
//           bio: doc.title || "No Bio Available",
//           year: doc.publish_year?.[0] || "Unknown Year", // Extract publish year
//         }));
//         setAuthors(mappedAuthors);
//       })
//       .catch((error) => {
//         console.error("Error fetching authors!", error);s
//       });
//   };

//   // Handle delete (local simulation)
//   const handleDelete = (id) => {
//     setAuthors(authors.filter((author) => author.id !== id));
//     alert("Author deleted successfully (local simulation)");
//   };

//   // Handle save (add or update)
//   const handleSave = () => {
//     if (!newAuthor.name || !newAuthor.bio || !newAuthor.year) {
//       alert("All fields (name, bio, and year) are required!");
//       return;
//     }

//     if (isEditing) {
//       // Update existing author (local simulation)
//       setAuthors(
//         authors.map((author) =>
//           author.id === editingAuthorId
//             ? { ...author, name: newAuthor.name, bio: newAuthor.bio, year: newAuthor.year }
//             : author
//         )
//       );
//       alert("Author updated successfully ");
//     } else {
//       // Add new author (local simulation)
//       const newId = authors.length ? authors[authors.length - 1].id + 1 : 0;
//       setAuthors([...authors, { id: newId, ...newAuthor }]);
//       alert("Author added successfully ");
//     }
//     closePopup();
//   };

//   // Open popup for add or edit
//   const openPopup = (author = null) => {
//     setShowPopup(true);
//     if (author) {
//       setIsEditing(true);
//       setEditingAuthorId(author.id);
//       setNewAuthor({ name: author.name, bio: author.bio, year: author.year });
//     } else {
//       setIsEditing(false);
//       setEditingAuthorId(null);
//       setNewAuthor({ name: "", bio: "", year: "" });
//     }
//   };

//   // Close popup
//   const closePopup = () => {
//     setShowPopup(false);
//     setNewAuthor({ name: "", bio: "", year: "" });
//     setIsEditing(false);
//     setEditingAuthorId(null);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-4">
//         <h1 className="text-3xl text-blue-800 font-bold mb-24 text-center">
//           Manage Authors
//         </h1>
//         <div className="flex justify-end -mb-12">
//           <button
//             onClick={() => openPopup()}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute right-12 top-44"
//           >
//             Add Author
//           </button>
//         </div>

//         <table className="min-w-full bg-white shadow-md rounded mt-14">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Bio</th>
//               <th className="px-4 py-2 text-left">Published Year</th> {/* Added column */}
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {authors.map((author) => (
//               <tr key={author.id} className="border-b">
//                 <td className="px-4 py-2">{author.name}</td>
//                 <td className="px-4 py-2">{author.bio}</td>
//                 <td className="px-4 py-2">{author.year}</td> {/* Display the year */}
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => openPopup(author)}
//                     className="text-blue-500 hover:text-blue-700 mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(author.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {showPopup && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-lg w-96">
//               <h3 className="text-xl font-semibold mb-4">
//                 {isEditing ? "Edit Author" : "Add Author"}
//               </h3>
//               <input
//                 type="text"
//                 value={newAuthor.name}
//                 onChange={(e) =>
//                   setNewAuthor({ ...newAuthor, name: e.target.value })
//                 }
//                 placeholder="Author Name"
//                 className="border p-2 rounded mb-4 w-full"
//               />
//               <textarea
//                 value={newAuthor.bio}
//                 onChange={(e) =>
//                   setNewAuthor({ ...newAuthor, bio: e.target.value })
//                 }
//                 placeholder="Author Bio"
//                 className="border p-2 rounded mb-4 w-full"
//               />
//               <input
//                 type="text"
//                 value={newAuthor.year}
//                 onChange={(e) =>
//                   setNewAuthor({ ...newAuthor, year: e.target.value })
//                 }
//                 placeholder="Published Year"
//                 className="border p-2 rounded mb-4 w-full"
//               />
//               <div className="flex justify-end">
//                 <button
//                   onClick={closePopup}
//                   className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   {isEditing ? "Update Author" : "Add Author"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ManageAuthors;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ManageAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    genre: "",
    birthYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Fetch authors from the backend API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/authors");
      console.log("Authors fetched:", response.data);
      if (Array.isArray(response.data)) {
        setAuthors(response.data);
      } else {
        console.error("Data is not in expected array format");
        setAuthors([]);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
      setAuthors([]);
    }
  };

  // Add a new author
  const addAuthor = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/authors", form);
      setAuthors((prevAuthors) => [...prevAuthors, response.data]);
      alert("Author added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  // Update an existing author
  const updateAuthor = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/authors/${editingId}`,
        form
      );
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) =>
          author.id === editingId ? { ...author, ...form } : author
        )
      );
      alert("Author updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  // Delete an author
  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/authors/${id}`);
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
      alert("Author deleted successfully!");
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateAuthor();
    } else {
      addAuthor();
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle edit button click
  const handleEdit = (author) => {
    setForm(author);
    setIsEditing(true);
    setEditingId(author.id);
    setShowForm(true);
  };

  // Reset form and close popup
  const resetForm = () => {
    setForm({
      name: "",
      bio: "",
      genre: "",
      birthYear: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl text-blue-800 font-bold mb-24 text-center">
          Manage Authors
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 absolute right-12 top-44"
        >
          Add Author
        </button>

        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">S.No</th> {/* Serial Number Column */}
              <th className="px-4 py-2">Author Name</th>
              <th className="px-4 py-2">Bio</th>
           
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={author.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td> {/* Displaying serial number */}
                <td className="px-4 py-2">{author.name}</td>
                <td className="px-4 py-2">{author.bio}</td>
               
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(author)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAuthor(author.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
   {/* Vertical Line */}
   <div className="w-1 border-l-2 border-gray-700 mx-6"></div>

{/* Popup form for adding/editing authors */}
<div className="w-1/3">
        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
            <div className="bg-gray-900 text-white p-6 rounded shadow-xl w-1/3 border-2 border-gray-700">
              <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Author" : "Add Author"}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Author Name"
                  className="border-2 border-gray-700 p-2 w-full mb-2 rounded bg-gray-800 text-white"
                  required
                />
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="border-2 border-gray-700 p-2 w-full mb-2 rounded bg-gray-800 text-white"
                  required
                />
                <input
                  type="text"
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="Genre"
                  className="border-2 border-gray-700 p-2 w-full mb-2 rounded bg-gray-800 text-white"
                  required
                />
                <input
                  type="number"
                  name="birthYear"
                  value={form.birthYear}
                  onChange={handleChange}
                  placeholder="Birth Year"
                  className="border-2 border-gray-700 p-2 w-full mb-4 rounded bg-gray-800 text-white"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {isEditing ? "Update Author" : "Add Author"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        )}
      </div>
      </div>
    </div>
  );
};

export default ManageAuthors;
