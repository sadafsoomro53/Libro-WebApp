import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const LS_TRANSACTIONS = "transaction-management-data";

// Seed data for transactions
const seedTransactions = [
  {
    id: 1,
    name: 'Saima Asif',
    email: 'saima@gmail.com',
    role: 'user',
    status: 'Active',
    books: 5,
    date: '28 Jan, 12:30 AM',
    payment: 'Paid',
    transactionType: 'Buy',
    amount: 2500,
    address: '123 Main St, Lahore',
    phone: '+92 300 1234567'
  },
  {
    id: 2,
    name: 'Ali Ahmed',
    email: 'ali.ahmed@email.com',
    role: 'vendor',
    status: 'Active',
    books: 12,
    date: '27 Jan, 03:45 PM',
    payment: 'Paid',
    transactionType: 'Rent',
    amount: 1200,
    address: '456 Oak Ave, Karachi',
    phone: '+92 321 9876543'
  },
  {
    id: 3,
    name: 'Fatima Khan',
    email: 'fatima.khan@email.com',
    role: 'admin',
    status: 'Active',
    books: 3,
    date: '26 Jan, 09:15 AM',
    payment: 'Paid',
    transactionType: 'Sell',
    amount: 1800,
    address: '789 Pine Rd, Islamabad',
    phone: '+92 333 4567890'
  },
  {
    id: 4,
    name: 'Usman Malik',
    email: 'usman.malik@email.com',
    role: 'user',
    status: 'Blocked',
    books: 8,
    date: '25 Jan, 06:20 PM',
    payment: 'Unpaid',
    transactionType: 'Exchange',
    amount: 0,
    address: '321 Elm St, Rawalpindi',
    phone: '+92 345 2345678'
  }
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [isLoading, setIsLoading] = useState(false);

  // State for transactions data
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(LS_TRANSACTIONS);
    return saved ? JSON.parse(saved) : seedTransactions;
  });

  // State for form handling
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'Active',
    books: 1,
    date: '',
    payment: 'Paid',
    transactionType: 'Buy',
    amount: '',
    address: '',
    phone: ''
  });

  // State for edit modal
  const [editingTransactionModal, setEditingTransactionModal] = useState(null);
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'Active',
    books: 1,
    date: '',
    payment: 'Paid',
    transactionType: 'Buy',
    amount: '',
    address: '',
    phone: ''
  });

  // State for viewing transaction details
  const [viewingTransaction, setViewingTransaction] = useState(null);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem(LS_TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

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
    if (!modalFormData.name.trim() || !modalFormData.email.trim() || !modalFormData.phone.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const transactionData = {
      ...modalFormData,
      amount: Number(modalFormData.amount),
      books: Number(modalFormData.books),
      id: editingTransactionModal.id
    };

    setTransactions(transactions.map(transaction =>
      transaction.id === editingTransactionModal.id ? transactionData : transaction
    ));

    setEditingTransactionModal(null);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingTransactionModal(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
      books: Number(formData.books),
      id: editingTransaction ? editingTransaction.id : Date.now(),
      date: formData.date || new Date().toLocaleString()
    };

    if (editingTransaction) {
      // Update existing transaction
      setTransactions(transactions.map(transaction =>
        transaction.id === editingTransaction.id ? transactionData : transaction
      ));
    } else {
      // Add new transaction
      setTransactions([...transactions, transactionData]);
    }

    // Reset form
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'Active',
      books: 1,
      date: '',
      payment: 'Paid',
      transactionType: 'Buy',
      amount: '',
      address: '',
      phone: ''
    });
    setEditingTransaction(null);
    setShowForm(false);
  };

  // Start editing a transaction
  const startEdit = (transaction) => {
    setEditingTransactionModal(transaction);
    setModalFormData(transaction);
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    }
  };

  // View transaction details
  const viewTransaction = (transaction) => {
    setViewingTransaction(transaction);
  };

  // Close view modal
  const closeViewModal = () => {
    setViewingTransaction(null);
  };

  // Approve transaction
  const approveTransaction = (id) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === id ? { ...transaction, status: 'Approved' } : transaction
    ));
  };

  // Reject transaction
  const rejectTransaction = (id) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === id ? { ...transaction, status: 'Rejected' } : transaction
    ));
  };

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-3xl fw-bold text-dark mb-2">Order/Transactions Management</h1>
        <p className="text-primary">Manage all transaction activities</p>
      </div>

      {/* Transaction summary card */}
      <div className="rounded p-4 shadow mb-4" style={{ background: "linear-gradient(to right, #15282E 0%, #0F969c 100%)" }}>
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
            <TransactionsTable
              transactions={transactions.filter(t => t.transactionType === activeTab)}
              mode={activeTab}
              onView={viewTransaction}
              onEdit={startEdit}
              onDelete={deleteTransaction}
            />
          ) : activeTab === 'Pending Approvals' ? (
            <PendingApprovalsTable
              transactions={transactions.filter(t => t.status === 'Pending' || t.status === 'Blocked')}
              onView={viewTransaction}
              onApprove={approveTransaction}
              onReject={rejectTransaction}
            />
          ) : (
            <TransactionForm mode={activeTab} />
          )}
        </div>
      </div>

      {/* View Transaction Modal */}
      {viewingTransaction && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transaction Details</h5>
                <button type="button" className="btn-close" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <strong>Name:</strong> {viewingTransaction.name}
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong> {viewingTransaction.email}
                  </div>
                  <div className="col-md-6">
                    <strong>Phone:</strong> {viewingTransaction.phone}
                  </div>
                  <div className="col-md-6">
                    <strong>Role:</strong> {viewingTransaction.role}
                  </div>
                  <div className="col-md-6">
                    <strong>Status:</strong> {viewingTransaction.status}
                  </div>
                  <div className="col-md-6">
                    <strong>Books:</strong> {viewingTransaction.books}
                  </div>
                  <div className="col-md-6">
                    <strong>Amount:</strong> ${viewingTransaction.amount}
                  </div>
                  <div className="col-md-6">
                    <strong>Payment:</strong> {viewingTransaction.payment}
                  </div>
                  <div className="col-md-6">
                    <strong>Transaction Type:</strong> {viewingTransaction.transactionType}
                  </div>
                  <div className="col-md-6">
                    <strong>Date:</strong> {viewingTransaction.date}
                  </div>
                  <div className="col-12">
                    <strong>Address:</strong> {viewingTransaction.address}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeViewModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Transaction Modal */}
      {editingTransactionModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Transaction</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleModalSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={modalFormData.name}
                        onChange={handleModalInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={modalFormData.email}
                        onChange={handleModalInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={modalFormData.phone}
                        onChange={handleModalInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Role</label>
                      <select
                        name="role"
                        value={modalFormData.role}
                        onChange={handleModalInputChange}
                        className="form-select"
                      >
                        <option value="user">User</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        value={modalFormData.status}
                        onChange={handleModalInputChange}
                        className="form-select"
                      >
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Books</label>
                      <input
                        type="number"
                        name="books"
                        value={modalFormData.books}
                        onChange={handleModalInputChange}
                        className="form-control"
                        min="1"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={modalFormData.amount}
                        onChange={handleModalInputChange}
                        className="form-control"
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Payment</label>
                      <select
                        name="payment"
                        value={modalFormData.payment}
                        onChange={handleModalInputChange}
                        className="form-select"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Transaction Type</label>
                      <select
                        name="transactionType"
                        value={modalFormData.transactionType}
                        onChange={handleModalInputChange}
                        className="form-select"
                      >
                        <option value="Buy">Buy</option>
                        <option value="Rent">Rent</option>
                        <option value="Sell">Sell</option>
                        <option value="Exchange">Exchange</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Date</label>
                      <input
                        type="text"
                        name="date"
                        value={modalFormData.date}
                        onChange={handleModalInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={modalFormData.address}
                        onChange={handleModalInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
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

/* ------------------ Transaction Components ------------------ */
function TransactionsTable({ transactions, onView, onEdit, onDelete }) {
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
              <td className="text-muted d-none d-md-table-cell">{tr.email}</td>
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
              <td className="text-muted small d-none d-lg-table-cell">{tr.date}</td>
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
                <div className="d-flex flex-wrap gap-1 justify-content-center">
                  <button
                    title="View"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onView(tr)}
                  >
                    <FaEye />
                  </button>
                  <button
                    title="Edit"
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => onEdit(tr)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    title="Delete"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(tr.id)}
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

function PendingApprovalsTable({ transactions, onView, onApprove, onReject }) {
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
              <td className="text-muted d-none d-md-table-cell">{tr.email}</td>
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
                  tr.status === 'Active' ? 'bg-success' :
                  tr.status === 'Blocked' ? 'bg-danger' :
                  tr.status === 'Approved' ? 'bg-success' :
                  tr.status === 'Rejected' ? 'bg-danger' :
                  'bg-warning text-dark'
                }`}>
                  {tr.status}
                </span>
              </td>
              <td className="fw-medium">{tr.books}</td>
              <td className="text-muted small d-none d-lg-table-cell">{tr.date}</td>
              <td className="fw-medium">${tr.amount || tr.books * 10}</td>
              <td>
                <div className="d-flex flex-wrap gap-1 justify-content-center">
                  <button
                    title="Approve"
                    className="btn btn-sm btn-outline-success"
                    onClick={() => onApprove(tr.id)}
                  >
                    ✓
                  </button>
                  <button
                    title="Reject"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onReject(tr.id)}
                  >
                    ✗
                  </button>
                  <button
                    title="View"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onView(tr)}
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

export default Orders;
