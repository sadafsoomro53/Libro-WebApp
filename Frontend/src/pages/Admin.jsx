import React, { useState, useEffect } from 'react';
import { FaChartBar, FaUsers, FaStore, FaBook, FaCreditCard, FaChartLine, FaCog, FaEye, FaEdit, FaTrash, FaUserFriends, FaStoreAlt, FaBookOpen } from 'react-icons/fa';
import UserManagement from './UserManagement';
import VendorManagement from './VendorManagement';
import BookManagement from './BookManagement';
import Orders from './Orders';
import Reports from './Reports';
import Settings from './Settings';
import Charts from '../components/Charts';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('Buy');
  const [isLoading, setIsLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState('weekly');
  const [userInitialTab, setUserInitialTab] = useState('Add User');
  const [vendorInitialTab, setVendorInitialTab] = useState('Add Vendor');
  const [bookManagementTab, setBookManagementTab] = useState('Add Book');
const [stats, setStats] = useState({ users: 0, vendors: 0, books: 8924 });

useEffect(() => {
  const loadUsersCount = () => {
    try {
      const usersData = localStorage.getItem("user-management-data");
      const users = usersData ? JSON.parse(usersData) : [];
      setStats(prevStats => ({
        ...prevStats,
        users: users.length
      }));
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      setStats(prevStats => ({
        ...prevStats,
        users: 0
      }));
    }
  };

  loadUsersCount();

  // Add event listener to update when users change in localStorage
  const handleStorageChange = (e) => {
    if (e.key === "user-management-data") {
      loadUsersCount();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);
  const [dashboardBooks, setDashboardBooks] = useState([]);

  // Load books from localStorage
  useEffect(() => {
    const loadBooks = () => {
      try {
        const booksData = localStorage.getItem("book-management-data");
        const books = booksData ? JSON.parse(booksData) : [];
        setStats(prevStats => ({
          ...prevStats,
          books: books.length
        }));
        // Get first 3 books for dashboard display
        setDashboardBooks(books.slice(0, 3));
      } catch (error) {
        console.error("Error loading books from localStorage:", error);
        setDashboardBooks([]);
      }
    };

    loadBooks();
    
    // Add event listener to update when books change
    const handleStorageChange = (e) => {
      if (e.key === "book-management-data") {
        loadBooks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Load vendors from localStorage
  useEffect(() => {
    const loadVendorsCount = () => {
      try {
        const vendorsData = localStorage.getItem("vendor-management-data");
        const vendors = vendorsData ? JSON.parse(vendorsData) : [];
        setStats(prevStats => ({
          ...prevStats,
          vendors: vendors.length
        }));
      } catch (error) {
        console.error("Error loading vendors from localStorage:", error);
        setStats(prevStats => ({
          ...prevStats,
          vendors: 0
        }));
      }
    };

    loadVendorsCount();

    // Add event listener to update when vendors change in localStorage
    const handleStorageChange = (e) => {
      if (e.key === "vendor-management-data") {
        loadVendorsCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const transactions = new Array(4).fill(0).map((_, i) => ({
    id: i + 1,
    name: ['Saima Asif', 'Ali Ahmed', 'Fatima Khan', 'Usman Malik'][i],
    email: ['saima@gmail.com', 'ali.ahmed@email.com', 'fatima.khan@email.com', 'usman.malik@email.com'][i],
    role: i % 3 === 0 ? 'user' : i % 3 === 1 ? 'vendor' : 'admin',
    status: i === 1 ? 'Blocked' : 'Active',
    books: [5, 12, 3, 8][i],
    date: ['28 Jan, 12:30 AM', '27 Jan, 03:45 PM', '26 Jan, 09:15 AM', '25 Jan, 06:20 PM'][i],
    payment: i === 3 ? 'Unpaid' : 'Paid',
  }));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar /> },
    { id: 'users', label: 'Users Management', icon: <FaUsers />, path: '/users' },
    { id: 'vendors', label: 'Vendors Management', icon: <FaStore />, path: '/vendors' },
    { id: 'books', label: 'Book Management', icon: <FaBook />, path: '/books' },
    { id: 'orders', label: 'Transactions Details', icon: <FaCreditCard />, path: '/orders' },
    { id: 'reports', label: 'Reports', icon: <FaChartLine />, path: '/reports' },
    { id: 'setting', label: 'Settings', icon: <FaCog />, path: '/settings' }
  ];

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="min-vh-100 d-flex" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #0F969c 100%)" }}>
      {/* Sidebar */}
      <aside className="w-25 p-4 text-white flex-shrink-0 shadow" style={{ background: "linear-gradient(to bottom, #15282E 0%, #0F969c 100%)" }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <span className="fs-4"><FaBook /></span>
          </div>
          <h2 className="fs-4 fw-bold text-white">Libro Admin</h2>
        </div>
        
        <nav className="d-flex flex-column gap-2">
          {menuItems.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveSection(m.id)}
              className={`w-100 d-flex align-items-center gap-3 px-3 py-2 rounded text-sm text-start border-0 ${
                activeSection === m.id 
                  ? 'text-dark fw-semibold' 
                  : 'text-white'
              }`}
              style={{ 
                backgroundColor: activeSection === m.id ? 'rgba(255,255,255,0.9)' : 'transparent',
                transition: 'all 0.3s'
              }}
            >
              <span className="fs-5">{m.icon}</span>
              <span className="flex-grow-1">{m.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <main className="flex-grow-1 p-4 overflow-auto">
        {activeSection === 'users' && <UserManagement initialTab={userInitialTab} />}
        {activeSection === 'vendors' && <VendorManagement initialTab={vendorInitialTab} />}
        {activeSection === 'books' && <BookManagement initialTab={bookManagementTab} />}
        {activeSection === 'orders' && <Orders />}
        {activeSection === 'reports' && <Reports />}
        {activeSection === 'categories' && <Categories />}
        {activeSection === 'notifications' && <Notifications />}
        {activeSection === 'setting' && <Settings />}
        
        {activeSection === 'dashboard' && (
          <>
            {/* Header */}
            <div className="mb-4">
              <h1 className="text-3xl fw-bold text-dark mb-2">Admin Dashboard</h1>
              <p className="text-primary">Manage your bookstore operations</p>
            </div>

            {/* Top stat cards */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <StatCard title="Total Users" value={stats.users} icon={<FaUserFriends />} onClick={() => { setUserInitialTab('View Users'); setActiveSection('users'); }} />
              </div>
              <div className="col-md-4 mb-3">
                <StatCard title="Total Vendors" value={stats.vendors} icon={<FaStoreAlt />} onClick={() => { setVendorInitialTab('View Vendors'); setActiveSection('vendors'); }} />
              </div>
              <div className="col-md-4 mb-3">
                <StatCard title="Total Books" value={stats.books} icon={<FaBookOpen />} onClick={() => { setBookManagementTab('View Books'); setActiveSection('books'); }} />
              </div>
            </div>

            {/* Transaction summary card */}
            <div className="rounded p-4 shadow" style={{ background: "linear-gradient(to right, #15282E 0%, #0F969c 100%)" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="text-2xl fw-semibold text-white">Transaction Summary</h3>
                  <p className="text-white small">Manage all transaction activities</p>
                </div>
                <div className="d-flex gap-2">
                  <div className="px-3 py-1 rounded text-white small fw-medium" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    {activeTab}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="d-flex flex-wrap gap-2 mb-3">
                {['Buy', 'Rent', 'Sell', 'Exchange', 'Pending Approvals'].map((t) => (
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
                ) : activeTab === 'Buy' || activeTab === 'Rent' || activeTab === 'Sell' || activeTab === 'Exchange' ? (
                  <TransactionsTable transactions={transactions.slice(0, 2)} mode={activeTab} />
                ) : activeTab === 'Pending Approvals' ? (
                  <PendingApprovalsTable transactions={transactions.slice(0, 2)} />
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">Add new transactions in the Orders section</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setActiveSection('orders')}
                      style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969C 100%)', border: 'none' }}
                    >
                      Go to Orders
                    </button>
                  </div>
                )}

                <div className="mt-4 d-flex justify-content-end">
                  <button 
                    className="d-flex align-items-center gap-2 text-white px-4 py-1 rounded shadow" 
                    style={{ background: "linear-gradient(to right, #0F969c 0%, #15282E 100%)" }}
                    onClick={() => setActiveSection('orders')}
                  >
                    View Full History
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white rounded p-4 shadow mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-2xl fw-semibold text-dark">Sales Analytics</h3>
                <div className="d-flex gap-2">
                  {['weekly', 'monthly', 'yearly'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimePeriod(period)}
                      className={`px-3 py-1 rounded border-0 ${
                        timePeriod === period
                          ? 'text-white fw-semibold'
                          : 'text-dark'
                      }`}
                      style={{ 
                        backgroundColor: timePeriod === period 
                          ? 'rgba(15, 150, 156, 0.9)' 
                          : 'rgba(15, 150, 156, 0.1)',
                        transition: 'all 0.3s'
                      }}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <Charts timePeriod={timePeriod} />
            </div>

            {/* Books Preview Section */}
            <div className="bg-white rounded p-4 shadow mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-2xl fw-semibold text-dark">Recent Books</h3>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveSection('books')}
                  style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969C 100%)', border: 'none' }}
                >
                  View All Books
                </button>
              </div>
              {dashboardBooks.length > 0 ? (
                <div className="row g-4">
                  {dashboardBooks.map((book) => (
                    <div key={book.id} className="col-md-4">
                      <div className="card shadow-sm h-100">
                        <div className="card-body">
                          <h5 className="card-title">{book.title}</h5>
                          <p className="card-text">
                            <strong>User ID:</strong> {book.userId}<br />
                            <strong>Genre:</strong> {book.genre}<br />
                            <strong>Type:</strong> {book.type}<br />
                            <strong>Price:</strong> Rs. {book.price.toLocaleString()}<br />
                            <strong>Condition:</strong> {book.condition}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <h4 className="text-muted">No books available</h4>
                  <p className="text-muted">Add books in the Book Management section</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveSection('books')}
                    style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969C 100%)', border: 'none' }}
                  >
                    Add Books
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ------------------ Components ------------------ */
function StatCard({ title, value, icon, onClick }) {
  const statCardClass = onClick 
    ? "bg-white rounded p-4 shadow d-flex align-items-center justify-content-between"
    : "bg-white rounded p-4 shadow d-flex align-items-center justify-content-between";
    
  return (
    <div className={statCardClass} onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      <div>
        <p className="text-muted small mb-1">{title}</p>
        <p className="h3 fw-bold text-dark">{value.toLocaleString()}</p>
      </div>
      <div className="w-14 h-14 rounded d-flex align-items-center justify-content-center text-white fs-4" style={{ background: "linear-gradient(to bottom right, #0F969c 0%, #15282E 100%)" }}>
        {icon}
      </div>
    </div>
  );
}

function TransactionsTable({ transactions }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Books</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tr) => (
            <tr key={tr.id}>
              <td className="fw-medium">{tr.name}</td>
              <td className="text-muted">{tr.email}</td>
              <td>
                <span className={`badge ${
                  tr.role === 'admin' ? 'bg-purple' :
                  tr.role === 'vendor' ? 'bg-primary' :
                  'bg-secondary'
                }`}>
                  {tr.role}
                </span>
              </td>
              <td>
                <span className={`badge ${
                  tr.status === 'Active' ? 'bg-success' : 'bg-danger'
                }`}>
                  {tr.status}
                </span>
              </td>
              <td className="fw-medium">{tr.books}</td>
              <td className="text-muted small">{tr.date}</td>
              <td>
                <span className={`badge ${
                  tr.payment === 'Paid' ? 'bg-success' : 
                  tr.payment === 'Unpaid' ? 'bg-warning text-dark' :
                  'bg-secondary'
                }`}>
                  {tr.payment}
                </span>
              </td>
              <td>
                <div className="d-flex flex-wrap gap-1">
                  <button 
                    title="View" 
                    className="btn btn-sm btn-outline-primary"
                  >
                    <FaEye />
                  </button>
                  <button 
                    title="Edit" 
                    className="btn btn-sm btn-outline-dark"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    title="Delete" 
                    className="btn btn-sm btn-outline-danger"
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

function PendingApprovalsTable({ transactions }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Books</th>
            <th>Date & Time</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tr) => (
            <tr key={tr.id}>
              <td className="fw-medium">{tr.name}</td>
              <td className="text-muted">{tr.email}</td>
              <td>
                <span className={`badge ${
                  tr.role === 'admin' ? 'bg-purple' :
                  tr.role === 'vendor' ? 'bg-primary' :
                  'bg-secondary'
                }`}>
                  {tr.role}
                </span>
              </td>
              <td>
                <span className={`badge ${
                  tr.status === 'Active' ? 'bg-success' : 'bg-danger'
                }`}>
                  {tr.status}
                </span>
              </td>
              <td className="fw-medium">{tr.books}</td>
              <td className="text-muted small">{tr.date}</td>
              <td className="fw-medium">${tr.books * 10}</td>
              <td>
                <div className="d-flex flex-wrap gap-1">
                  <button 
                    title="Approve" 
                    className="btn btn-sm btn-outline-success"
                  >
                    ✓
                  </button>
                  <button 
                    title="Reject" 
                    className="btn btn-sm btn-outline-danger"
                  >
                    ✗
                  </button>
                  <button 
                    title="View" 
                    className="btn btn-sm btn-outline-primary"
                  >
                    <FaEye />
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

function TransactionForm({ mode }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'user', books: 1, date: '', payment: 'Paid' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: handle submit (save/update) logic
    alert(`${mode} submitted (demo) — ` + JSON.stringify(form));
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          className="form-control"
          placeholder="Enter full name"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          className="form-control"
          placeholder="example@mail.com"
          type="email"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Role</label>
        <select 
          name="role" 
          value={form.role} 
          onChange={handleChange} 
          className="form-select"
        >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label">Books</label>
        <input 
          type="number" 
          name="books" 
          value={form.books} 
          onChange={handleChange} 
          min={1} 
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Date</label>
        <input 
          type="datetime-local" 
          name="date" 
          value={form.date} 
          onChange={handleChange} 
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Payment Status</label>
        <select 
          name="payment" 
          value={form.payment} 
          onChange={handleChange} 
          className="form-select"
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="col-12 d-flex justify-content-end gap-2 mt-3">
        <button 
          type="button" 
          onClick={() => setForm({ name: '', email: '', role: 'user', books: 1, date: '', payment: 'Paid' })} 
          className="btn btn-outline-secondary"
        >
          Reset
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Save {mode}
        </button>
      </div>
    </form>
  );
}
