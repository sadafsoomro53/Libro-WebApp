import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [isLoading, setIsLoading] = useState(false);

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
            <TransactionsTable transactions={transactions} mode={activeTab} />
          ) : activeTab === 'Pending Approvals' ? (
            <PendingApprovalsTable transactions={transactions} />
          ) : (
            <TransactionForm mode={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------ Transaction Components ------------------ */
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

export default Orders;
