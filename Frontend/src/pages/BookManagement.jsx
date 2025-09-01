import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaPlus, FaBook } from 'react-icons/fa';

const LS_BOOKS = "book-management-data";

// Seed data for books
const seedBooks = [
  {
    id: '1',
    userId: "U001",
    title: "To Kill a Mockingbird",
    type: "Fiction",
    genre: "Classic",
    condition: "New",
    price: 1200
  },
  {
    id: '2',
    userId: "U002",
    title: "1984",
    type: "Fiction",
    genre: "Dystopian",
    condition: "Used",
    price: 950
  },
  {
    id: '3',
    userId: "U003",
    title: "Urdu class2",
    type: "Non-Fiction",
    genre: "Educational",
    condition: "New",
    price: 500
  },
  {
    id: '4',
    userId: "U004",
    title: "Pride and Prejudice",
    type: "Fiction",
    genre: "Romance",
    condition: "Used",
    price: 800
  }
];

const BookManagement = () => {
  // State for books data
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(LS_BOOKS);
    return saved ? JSON.parse(saved) : seedBooks;
  });

  // State for form handling
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    type: "Fiction",
    genre: "",
    condition: "New",
    price: ""
  });

  // State for edit modal
  const [editingBookModal, setEditingBookModal] = useState(null);
  const [modalFormData, setModalFormData] = useState({
    userId: "",
    title: "",
    type: "Fiction",
    genre: "",
    condition: "New",
    price: ""
  });

  // State for viewing book details
  const [viewingBook, setViewingBook] = useState(null);

  // Save books to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem(LS_BOOKS, JSON.stringify(books));
  }, [books]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle modal form input changes
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle modal form submission
  const handleModalSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!modalFormData.userId.trim() || !modalFormData.title.trim() || !modalFormData.genre.trim() || !modalFormData.price) {
      alert("Please fill in all required fields");
      return;
    }

    const bookData = {
      ...modalFormData,
      price: Number(modalFormData.price),
      id: editingBookModal.id
    };

    setBooks(books.map(book =>
      book.id === editingBookModal.id ? bookData : book
    ));

    setEditingBookModal(null);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingBookModal(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.userId.trim() || !formData.title.trim() || !formData.genre.trim() || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    const bookData = {
      ...formData,
      price: Number(formData.price),
      id: editingBook ? editingBook.id : Date.now().toString()
    };

    if (editingBook) {
      // Update existing book
      setBooks(books.map(book =>
        book.id === editingBook.id ? bookData : book
      ));
    } else {
      // Add new book
      setBooks([...books, bookData]);
    }

    // Reset form
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      userId: "",
      title: "",
      type: "Fiction",
      genre: "",
      condition: "New",
      price: ""
    });
    setEditingBook(null);
    setShowForm(false);
  };

  // Start editing a book
  const startEdit = (book) => {
    setEditingBookModal(book);
    setModalFormData(book);
  };

  // Delete a book
  const deleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  // View book details
  const viewBook = (book) => {
    setViewingBook(book);
  };

  // Close view modal
  const closeViewModal = () => {
    setViewingBook(null);
  };

  const [activeTab, setActiveTab] = useState('Add Book');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-3xl fw-bold text-dark mb-2">
          <FaBook className="me-2" />
          Book Management
        </h1>
        <p className="text-primary">Manage all book inventory and details</p>
      </div>

      {/* Book summary card */}
      <div className="rounded p-4 shadow mb-4" style={{ background: "linear-gradient(to right, #15282E 0%, #0F969c 100%)" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="text-2xl fw-semibold text-white">Book Management</h3>
            <p className="text-white small">Manage book inventory, categories, and analytics</p>
          </div>
          <div className="d-flex gap-2">
            <div className="px-3 py-1 rounded text-white small fw-medium" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              {activeTab}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {['Add Book', 'View Books', 'Book Analytics', 'Book Categories'].map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`px-3 py-1 rounded border-0 ${
                activeTab === t
                  ? 'text-dark fw-semibold'
                  : 'text-white'
              }`}
              style={{
                backgroundColor: activeTab === t ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="bg-white rounded p-4 shadow-sm">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : activeTab === 'View Books' ? (
            <BooksTable books={books} onView={viewBook} onEdit={startEdit} onDelete={deleteBook} />
          ) : activeTab === 'Book Analytics' ? (
            <BookAnalytics books={books} />
          ) : activeTab === 'Book Categories' ? (
            <BookCategories books={books} />
          ) : (
            <BookForm
              formData={formData}
              editingBook={editingBook}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={resetForm}
            />
          )}
        </div>
      </div>

      {/* View Book Modal */}
      {viewingBook && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Details</h5>
                <button type="button" className="btn-close" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <h6>User ID:</h6>
                    <p>{viewingBook.userId}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Title:</h6>
                    <p>{viewingBook.title}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Type:</h6>
                    <p>{viewingBook.type}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Genre:</h6>
                    <p>{viewingBook.genre}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Condition:</h6>
                    <p>
                      <span className={`badge ${
                        viewingBook.condition === 'New' ? 'bg-success' :
                        viewingBook.condition === 'Used' ? 'bg-warning text-dark' :
                        'bg-secondary'
                      }`}>
                        {viewingBook.condition}
                      </span>
                    </p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Price:</h6>
                    <p>Rs. {viewingBook.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeViewModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {editingBookModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Book</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <BookForm
                  formData={modalFormData}
                  editingBook={editingBookModal}
                  onInputChange={handleModalInputChange}
                  onSubmit={handleModalSubmit}
                  onReset={closeEditModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------ Book Components ------------------ */

function BooksTable({ books, onView, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>User ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Condition</th>
            <th>Price (Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              style={{
                transition: 'all 0.2s ease',
                borderLeft: `4px solid ${
                  book.type === 'Fiction' ? '#6f42c1' : '#20c997'
                }`
              }}
            >
              <td className="fw-medium">{book.userId}</td>
              <td className="fw-semibold text-dark">{book.title}</td>
              <td>
                <span className={`badge ${
                  book.type === 'Fiction'
                    ? 'bg-purple text-white'
                    : 'bg-success text-white'
                }`}>
                  {book.type}
                </span>
              </td>
              <td>
                <span className="badge bg-light text-dark border">
                  {book.genre}
                </span>
              </td>
              <td>
                <span className={`badge ${
                  book.condition === 'New' ? 'bg-success' :
                  book.condition === 'Used' ? 'bg-warning text-dark' :
                  'bg-secondary'
                }`}>
                  {book.condition}
                </span>
              </td>
              <td className="fw-bold text-success">
                Rs. {book.price.toLocaleString()}
              </td>
              <td>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onView(book)}
                    title="View"
                    style={{
                      transition: 'all 0.2s ease',
                      border: '1px solid #0d6efd'
                    }}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => onEdit(book)}
                    title="Edit"
                    style={{
                      transition: 'all 0.2s ease',
                      border: '1px solid #212529'
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(book.id)}
                    title="Delete"
                    style={{
                      transition: 'all 0.2s ease',
                      border: '1px solid #dc3545'
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BookForm({ formData, editingBook, onInputChange, onSubmit, onReset }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">User ID *</label>
          <input
            type="text"
            className="form-control"
            name="userId"
            value={formData.userId}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Title *</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={onInputChange}
          >
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Genre *</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={formData.genre}
            onChange={onInputChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Condition</label>
          <select
            className="form-select"
            name="condition"
            value={formData.condition}
            onChange={onInputChange}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Price (Rs) *</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={onInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-dark">
          {editingBook ? "Update Book" : "Add Book"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onReset}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function BookAnalytics({ books }) {
  const totalBooks = books.length;
  const fictionBooks = books.filter(book => book.type === 'Fiction').length;
  const nonfictionBooks = books.filter(book => book.type === 'Non-Fiction').length;
  const newBooks = books.filter(book => book.condition === 'New').length;
  const usedBooks = books.filter(book => book.condition === 'Used').length;
  const totalValue = books.reduce((sum, book) => sum + book.price, 0);

  const genres = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="text-center py-4">
      <h4 className="text-dark mb-4">Book Analytics</h4>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h6 className="card-title text-muted">Total Books</h6>
              <h3 className="text-primary">{totalBooks}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h6 className="card-title text-muted">Fiction</h6>
              <h3 className="text-purple">{fictionBooks}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h6 className="card-title text-muted">Non-Fiction</h6>
              <h3 className="text-success">{nonfictionBooks}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h6 className="card-title text-muted">Total Value</h6>
              <h3 className="text-success">Rs. {totalValue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Condition Distribution */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h6 className="card-title">Condition Distribution</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">New Books:</span>
                <span className="fw-bold text-success">{newBooks}</span>
              </div>
              <div className="progress mb-2">
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${totalBooks > 0 ? (newBooks / totalBooks) * 100 : 0}%` }}
                >
                  {totalBooks > 0 ? Math.round((newBooks / totalBooks) * 100) : 0}%
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Used Books:</span>
                <span className="fw-bold text-warning">{usedBooks}</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${totalBooks > 0 ? (usedBooks / totalBooks) * 100 : 0}%` }}
                >
                  {totalBooks > 0 ? Math.round((usedBooks / totalBooks) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h6 className="card-title">Genre Distribution</h6>
              {Object.entries(genres).map(([genre, count]) => (
                <div key={genre} className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">{genre}:</span>
                  <span className="fw-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookCategories({ books }) {
  const genres = books.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = [];
    }
    acc[book.genre].push(book);
    return acc;
  }, {});

  return (
    <div className="text-center py-4">
      <h4 className="text-dark mb-4">Book Categories</h4>
      <div className="row">
        {Object.entries(genres).map(([genre, booksInGenre]) => (
          <div key={genre} className="col-md-6 mb-4">
            <div className="card border-0 shadow">
              <div className="card-header bg-light">
                <h6 className="mb-0">{genre} ({booksInGenre.length} books)</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {booksInGenre.map((book) => (
                    <div key={book.id} className="col-12 mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-medium">{book.title}</span>
                        <div>
                          <span className={`badge me-2 ${
                            book.type === 'Fiction' ? 'bg-purple' : 'bg-success'
                          }`}>
                            {book.type}
                          </span>
                          <span className={`badge ${
                            book.condition === 'New' ? 'bg-success' : 'bg-warning text-dark'
                          }`}>
                            {book.condition}
                          </span>
                        </div>
                      </div>
                      <small className="text-muted">Rs. {book.price.toLocaleString()}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookManagement;
