import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const LS_USERS = "user-management-data";

// Seed data for users
const seedUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@email.com',
    phone: '+1 555 1234567',
    userId: 'USR001',
    status: 'Active',
    joinDate: '15 Jan 2023',
    role: 'User',
    address: '123 Main St, City, State',
    blocked: false
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@email.com',
    phone: '+1 555 2345678',
    userId: 'USR002',
    status: 'Active',
    joinDate: '28 Feb 2023',
    role: 'Admin',
    address: '456 Oak Ave, City, State',
    blocked: false
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@email.com',
    phone: '+1 555 3456789',
    userId: 'USR003',
    status: 'Inactive',
    joinDate: '12 Mar 2023',
    role: 'User',
    address: '789 Pine Rd, City, State',
    blocked: true
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana@email.com',
    phone: '+1 555 4567890',
    userId: 'USR004',
    status: 'Active',
    joinDate: '05 Apr 2023',
    role: 'Moderator',
    address: '321 Elm St, City, State',
    blocked: false
  },
  {
    id: 5,
    name: 'Ethan Hunt',
    email: 'ethan@email.com',
    phone: '+1 555 5678901',
    userId: 'USR005',
    status: 'Pending',
    joinDate: '20 May 2023',
    role: 'User',
    address: '654 Maple Dr, City, State',
    blocked: false
  }
];

const UserManagement = ({ initialTab = 'Add User' }) => {
  // State for users data
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(LS_USERS);
    return saved ? JSON.parse(saved) : seedUsers;
  });

  // Toggle block/unblock user
  const toggleBlockUser = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, blocked: !user.blocked };
      }
      return user;
    }));
  };

  // State for form handling
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userId: '',
    role: 'User',
    status: 'Active',
    address: ''
  });

  // State for edit modal
  const [editingUserModal, setEditingUserModal] = useState(null);
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userId: '',
    role: 'User',
    status: 'Active',
    address: ''
  });

  // State for viewing user details
  const [viewingUser, setViewingUser] = useState(null);

  // Save users to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  }, [users]);

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
    if (!modalFormData.name.trim() || !modalFormData.email.trim() || !modalFormData.phone.trim() || !modalFormData.userId.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const userData = {
      ...modalFormData,
      id: editingUserModal.id,
      joinDate: editingUserModal.joinDate
    };

    setUsers(users.map(user =>
      user.id === editingUserModal.id ? userData : user
    ));

    setEditingUserModal(null);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingUserModal(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.userId.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const userData = {
      ...formData,
      id: editingUser ? editingUser.id : Date.now(),
      joinDate: editingUser ? editingUser.joinDate : new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    if (editingUser) {
      // Update existing user
      setUsers(users.map(user =>
        user.id === editingUser.id ? userData : user
      ));
    } else {
      // Add new user
      setUsers([...users, userData]);
    }

    // Reset form
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      userId: '',
      role: 'User',
      status: 'Active',
      address: ''
    });
    setEditingUser(null);
    setShowForm(false);
  };

  // Start editing a user
  const startEdit = (user) => {
    setEditingUserModal(user);
    setModalFormData(user);
  };

  // Delete a user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // View user details
  const viewUser = (user) => {
    setViewingUser(user);
  };

  // Close view modal
  const closeViewModal = () => {
    setViewingUser(null);
  };

  const [activeTab, setActiveTab] = useState('Add User');
  const [isLoading, setIsLoading] = useState(false);

  // Set initial tab based on prop
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-3xl fw-bold text-dark mb-2">User Management</h1>
        <p className="text-primary">Manage all user accounts and information</p>
      </div>

      {/* User summary card */}
      <div className="rounded p-4 shadow mb-4" style={{ background: "linear-gradient(to right, #15282E 0%, #0F969c 100%)" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="text-2xl fw-semibold text-white">User Management</h3>
            <p className="text-white small">Manage user profiles, accounts, and activities</p>
          </div>
          <div className="d-flex gap-2">
            <div className="px-3 py-1 rounded text-white small fw-medium" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              {activeTab}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {['Add User', 'View Users', 'User Activity', 'Account Settings'].map((t) => (
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
          ) : activeTab === 'View Users' ? (
            <UsersTable users={users} onView={viewUser} onEdit={startEdit} onDelete={deleteUser} onBlockToggle={toggleBlockUser} />
          ) : activeTab === 'User Activity' ? (
            <UserActivity users={users} />
          ) : activeTab === 'Account Settings' ? (
            <AccountSettings users={users} />
          ) : (
            <UserForm
              formData={formData}
              editingUser={editingUser}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={resetForm}
            />
          )}
        </div>
      </div>

      {/* View User Modal */}
      {viewingUser && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <h6>Name:</h6>
                    <p>{viewingUser.name}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Email:</h6>
                    <p>{viewingUser.email}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Phone:</h6>
                    <p>{viewingUser.phone}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>User ID:</h6>
                    <p>{viewingUser.userId}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Role:</h6>
                    <p>
                      <span className={`badge ${
                        viewingUser.role === 'Admin' ? 'bg-danger' :
                        viewingUser.role === 'Moderator' ? 'bg-warning text-dark' :
                        'bg-primary'
                      }`}>
                        {viewingUser.role}
                      </span>
                    </p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Status:</h6>
                    <p>
                      <span className={`badge ${
                        viewingUser.status === 'Active' ? 'bg-success' :
                        viewingUser.status === 'Inactive' ? 'bg-secondary' :
                        'bg-warning text-dark'
                      }`}>
                        {viewingUser.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Join Date:</h6>
                    <p>{viewingUser.joinDate}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Address:</h6>
                    <p>{viewingUser.address}</p>
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

      {/* Edit User Modal */}
      {editingUserModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <form onSubmit={handleModalSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={modalFormData.name}
                        onChange={handleModalInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={modalFormData.email}
                        onChange={handleModalInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={modalFormData.phone}
                        onChange={handleModalInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">User ID *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="userId"
                        value={modalFormData.userId}
                        onChange={handleModalInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        name="role"
                        value={modalFormData.role}
                        onChange={handleModalInputChange}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        name="status"
                        value={modalFormData.status}
                        onChange={handleModalInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending Approval</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        value={modalFormData.address}
                        onChange={handleModalInputChange}
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------ User Components ------------------ */
function UsersTable({ users, onView, onEdit, onDelete, onBlockToggle }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th className="d-none d-md-table-cell">Email</th>
            <th className="d-none d-lg-table-cell">Phone</th>
            <th>User ID</th>
            <th>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={user.blocked ? 'table-danger' : ''}>
              <td className="fw-medium">{user.name}</td>
              <td className="text-muted d-none d-md-table-cell">{user.email}</td>
              <td className="text-muted d-none d-lg-table-cell">{user.phone}</td>
              <td className="fw-medium">{user.userId}</td>
              <td>
                {user.blocked ? (
                  <span className="badge bg-danger">Blocked</span>
                ) : (
                  <span className="badge bg-success">Active</span>
                )}
              </td>
              <td>
                <div className="d-flex flex-wrap gap-1">
                  <button
                    title="View"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onView(user)}
                  >
                    <FaEye />
                  </button>
                  <button
                    title="Edit"
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => onEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    title={user.blocked ? "Unblock" : "Block"}
                    className={`btn btn-sm btn-outline-${user.blocked ? "success" : "warning"}`}
                    onClick={() => onBlockToggle(user.id)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    title="Delete"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(user.id)}
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

function UserActivity({ users }) {
  return (
    <div className="text-center py-4">
      <h4 className="text-dark mb-3">User Activity Metrics</h4>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-3 mb-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6 className="card-title">{user.name}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Status:</span>
                  <span className={`badge ${user.status === 'Active' ? 'bg-success' : user.status === 'Inactive' ? 'bg-secondary' : 'bg-warning text-dark'}`}>
                    {user.status}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="text-muted small">Join Date:</span>
                  <span className="fw-bold">{user.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountSettings({ users }) {
  return (
    <div className="text-center py-4">
      <h4 className="text-dark mb-3">Account Settings</h4>
      <p className="text-muted">Manage user account settings and permissions</p>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="card-title">{user.name}</h6>
                <div className="progress mb-2">
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${user.status === 'Active' ? 100 : user.status === 'Inactive' ? 0 : 50}%` }}
                  >
                    {user.status}
                  </div>
                </div>
                <small className="text-muted">Account status level</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserForm({ formData, editingUser, onInputChange, onSubmit, onReset }) {
  return (
    <form onSubmit={onSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Full Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="form-control"
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Email *</label>
        <input
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className="form-control"
          placeholder="user@email.com"
          type="email"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Phone Number *</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          className="form-control"
          placeholder="+1 555 1234567"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">User ID *</label>
        <input
          name="userId"
          value={formData.userId}
          onChange={onInputChange}
          className="form-control"
          placeholder="USR001"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={onInputChange}
          className="form-select"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={onInputChange}
          className="form-select"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending Approval</option>
        </select>
      </div>

      <div className="col-12">
        <label className="form-label">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={onInputChange}
          className="form-control"
          placeholder="Enter complete address"
          rows="3"
        />
      </div>

      <div className="col-12 d-flex justify-content-end gap-2 mt-3">
        <button
          type="button"
          onClick={onReset}
          className="btn btn-outline-secondary"
        >
          Reset
        </button>
        <button
          type="submit"
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <FaPlus /> {editingUser ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
}

export default UserManagement;
