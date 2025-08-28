import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEdit, FaTrash, FaFilter, FaBook, FaLanguage, FaStar, FaTag } from "react-icons/fa";
import LoginPopup from '../components/LoginPopup';

const LS_BOOKS = "allbooks-data-v2";
const LS_CART = "cart-items-v2";

/* === Enhanced Book Data Structure === */
const seedBooks = [
  {
    id: crypto.randomUUID(),
    title: "Echoles in the Moon",
    img: "/book1.png",
    desc: "Hear the whispers of the Moon, guide the adventure to uncover ancient secrets that save the world.",
    price: 1200,
    category: "Fiction",
    condition: "New",
    language: "English",
    level: "Adult",
    rating: 4.5,
    author: "Sarah Johnson"
  },
  {
    id: crypto.randomUUID(),
    title: "Mariana",
    img: "/book2.png",
    desc: "Lost in the world of Mariana. A beautiful story of growth and the power of the past.",
    price: 950,
    category: "Fiction",
    condition: "Used",
    language: "English",
    level: "Teens",
    rating: 4.2,
    author: "Maria Williams"
  },
  {
    id: crypto.randomUUID(),
    title: "Inception",
    img: "/book3.png",
    desc: "A thief who steals corporate secrets through dream-sharing tech is tasked with planting an idea.",
    price: 1500,
    category: "Sci-Fi",
    condition: "New",
    language: "English",
    level: "Adult",
    rating: 4.8,
    author: "Christopher Nolan"
  },
  {
    id: crypto.randomUUID(),
    title: "Introduction to Algorithms",
    img: "/book4.jpg",
    desc: "Comprehensive guide to algorithms and data structures for computer science students.",
    price: 1800,
    category: "Academic",
    condition: "New",
    language: "English",
    level: "Adult",
    rating: 4.9,
    author: "Thomas Cormen"
  },
  {
    id: crypto.randomUUID(),
    title: "Harry Potter and the Sorcerer's Stone",
    img: "/book5.jpg",
    desc: "The magical journey begins as Harry discovers he's a wizard and attends Hogwarts.",
    price: 800,
    category: "Fiction",
    condition: "New",
    language: "English",
    level: "Kids",
    rating: 4.7,
    author: "J.K. Rowling"
  },
  {
    id: crypto.randomUUID(),
    title: "The Great Gatsby",
    img: "/book6.png",
    desc: "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    price: 2300,
    category: "Academic",
    condition: "New",
    language: "English",
    level: "Adult",
    rating: 4.7,
    author: "F. Scott Fitzgerald"
  },
  {
    id: crypto.randomUUID(),
    title: "Clean Code",
    img: "/book7.png",
    desc: "A handbook of agile software craftsmanship for professional developers.",
    price: 2200,
    category: "Academic",
    condition: "New",
    language: "English",
    level: "Adult",
    rating: 4.6,
    author: "Robert Martin"
  }
];

const AllBooks = () => {
  // State Management
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(LS_BOOKS);
    return saved ? JSON.parse(saved) : seedBooks;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(LS_CART);
    return saved ? JSON.parse(saved) : [];
  });

  // Filter States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [language, setLanguage] = useState("All");
  const [level, setLevel] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");

  // Form States for Add/Edit
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    desc: "",
    img: "",
    price: "",
    category: "Fiction",
    condition: "New",
    language: "English",
    level: "Adult",
    rating: 4.5
  });

  // Categories and Options
  const categories = ["All", "Fiction", "Academic", "Sci-Fi", "Biography", "Self-Help", "History"];
  const conditions = ["All", "New", "Used", "Damaged"];
  const languages = ["All", "English", "Urdu", "Hindi", "Arabic"];
  const levels = ["All", "Kids", "Teens", "Adult"];

  // Effects
  useEffect(() => {
    localStorage.setItem(LS_BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(LS_CART, JSON.stringify(cart));
  }, [cart]);

  // Filter and Sort Logic
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    // Search
    if (search.trim()) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.desc.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter(book => book.category === category);
    }

    // Condition filter
    if (condition !== "All") {
      filtered = filtered.filter(book => book.condition === condition);
    }

    // Language filter
    if (language !== "All") {
      filtered = filtered.filter(book => book.language === language);
    }

    // Level filter
    if (level !== "All") {
      filtered = filtered.filter(book => book.level === level);
    }

    // Price filter
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);
    filtered = filtered.filter(book => book.price >= min && book.price <= max);

    // Sorting
    switch (sortBy) {
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-asc":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [books, search, category, condition, language, level, minPrice, maxPrice, sortBy]);

  // Cart Functions
  const addToCart = (book) => {
    // Check if user is logged in
    const userData = localStorage.getItem('libro_user');
    if (!userData) {
      setShowLoginPopup(true);
      return;
    }

    const existingItem = cart.find(item => item.id === book.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === book.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCart(cart.map(item => 
        item.id === bookId ? { ...item, quantity } : item
      ));
    }
  };


  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Form Functions
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.desc.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const bookData = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      id: editingBook ? editingBook.id : crypto.randomUUID()
    };

    if (editingBook) {
      setBooks(books.map(book => book.id === editingBook.id ? bookData : book));
    } else {
      setBooks([bookData, ...books]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      desc: "",
      img: "",
      price: "",
      category: "Fiction",
      condition: "New",
      language: "English",
      level: "Adult",
      rating: 4.5
    });
    setEditingBook(null);
    setShowForm(false);
  };

  const startEdit = (book) => {
    setEditingBook(book);
    setFormData(book);
    setShowForm(true);
  };

  const deleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter(book => book.id !== bookId));
      setCart(cart.filter(item => item.id !== bookId));
    }
  };

  // Render Stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? "text-warning" : "text-muted"}
        style={{ fontSize: "0.8rem" }}
      />
    ));
  };

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
      {/* Header */}
      <div className="bg-white shadow-sm mb-4">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className=" mb-0">
              <FaBook className="me-2" />
              All Books
            </h1>
            <div className="d-flex btn align-items-center gap-3">
              <Link to="/cart" className="btn" style={{ backgroundColor: '#15282E', color: '#fff' }}>
                <FaShoppingCart />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{ backgroundColor: '#15282E', color: '#fff' }}>
                  {cart.length}
                </span>
              </Link>
              <button 
                className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969C 100%)' }}
                onClick={() => setShowForm(true)}
              >
                Add New Book
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969C 100%)' }}>
                <h5 className="mb-0">
                  <FaFilter className="me-2" />
                  Filters
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Condition</label>
                  <select 
                    className="form-select"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    {conditions.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Language</label>
                  <select 
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Level</label>
                  <select 
                    className="form-select"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    {levels.map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Price Range</label>
                  <div className="d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Sort By</label>
                  <select 
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                    <option value="price-asc">Price Low-High</option>
                    <option value="price-desc">Price High-Low</option>
                    <option value="rating-desc">Rating High-Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className="col-lg-9">
            <div className="row g-4">
              {filteredBooks.map((book) => (
                <div key={book.id} className="col-md-6 col-lg-4">
                  <div className="card shadow-sm h-100">
                    <div className="position-relative">
                      <img
                        src={book.img}
                        alt={book.title}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/250x350/2e8b57/ffffff?text=No+Image";
                        }}
                      />
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className={`badge ${book.condition === 'New' ? 'bg-success' : book.condition === 'Used' ? 'bg-warning' : 'bg-danger'}`}>
                          {book.condition}
                        </span>
                      </div>
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-primary" style={{ fontSize: '0.9rem' }}>
                          <FaTag className="me-1" />
                          {book.category}
                        </span>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text text-muted small">{book.desc}</p>
                      
                      <div className="mb-2">
                        <small className="text-muted">By {book.author}</small>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          {renderStars(book.rating)}
                          <small className="ms-1">({book.rating})</small>
                        </div>
                        <span className="badge bg-info">{book.level}</span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-secondary">{book.language}</span>
                        <span className="fw-bold text-dark">
                          Rs. {book.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="mt-auto d-flex gap-2">
                        <button
                          className="btn btn-dark btn-sm flex-fill"
                          onClick={() => addToCart(book)}
                        >
                          <FaShoppingCart className="me-1" />
                          Add to Cart
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => startEdit(book)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteBook(book.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredBooks.length === 0 && (
                <div className="col-12">
                  <div className="text-center py-5">
                    <h4 className="text-muted">No books found</h4>
                    <p className="text-muted">Try adjusting your filters</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Book Modal */}
      {showForm && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBook ? "Edit Book" : "Add New Book"}
                </h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Author *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.desc}
                      onChange={(e) => setFormData({...formData, desc: e.target.value})}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Image URL *</label>
                      <input
                        type="url"
                        className="form-control"
                        value={formData.img}
                        onChange={(e) => setFormData({...formData, img: e.target.value})}
                        placeholder="/book1.png"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        {categories.filter(c => c !== "All").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Condition</label>
                      <select
                        className="form-select"
                        value={formData.condition}
                        onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      >
                        {conditions.filter(c => c !== "All").map(cond => (
                          <option key={cond} value={cond}>{cond}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Language</label>
                      <select
                        className="form-select"
                        value={formData.language}
                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                      >
                        {languages.filter(l => l !== "All").map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Level</label>
                      <select
                        className="form-select"
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                      >
                        {levels.filter(l => l !== "All").map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rating (1-5)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      min="1"
                      max="5"
                      step="0.1"
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-dark">
                      {editingBook ? "Update Book" : "Add Book"}
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969C 100%)' }} onClick={resetForm}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
