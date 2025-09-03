import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { db } from "../firebase"; 
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc
} from "firebase/firestore";

const UserManagement = ({ initialTab = 'Add User' }) => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('Add User');
  const [isLoading, setIsLoading] = useState(false);

  const usersRef = collection(db, "users");

  useEffect(() => {
    const unsub = onSnapshot(usersRef, (snapshot) => {
      const userList = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setUsers(userList);
    });
    return () => unsub();
  }, []);

  // Toggle block/unblock user
  const toggleBlockUser = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "users", id), { blocked: !currentStatus });
    } catch (err) {
      console.error("Error updating block status:", err);
    }
  };

  // State for form handling
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  userType: 'User'
});

// State for edit modal
const [editingUserModal, setEditingUserModal] = useState(null);
const [modalFormData, setModalFormData] = useState({
  name: '',
  email: '',
  phone: '',
  userType: 'User'
});


  // State for viewing user details
  const [viewingUser, setViewingUser] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle modal form input changes
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle modal form submission (update user in Firestore)
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", editingUserModal.id), {
        ...modalFormData,
      });
      setEditingUserModal(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const closeEditModal = () => setEditingUserModal(null);

  // Handle add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateDoc(doc(db, "users", editingUser.id), {
          ...formData,
        });
          alert("User updated successfully!");

      } else {
        await addDoc(usersRef, {
          ...formData,
          blocked: false,
        });
        alert("User added successfully!");
      }
      resetForm();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      userType: 'User',
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const startEdit = (user) => {
    setEditingUserModal(user);
    setModalFormData(user);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
await deleteDoc(doc(db, "users", id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const viewUser = (user) => setViewingUser(user);
  const closeViewModal = () => setViewingUser(null);

  // keep your existing tab logic
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
                    <p>{viewingUser.id}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Role:</h6>
                    <p>
                        {viewingUser.userType}
                    </p>
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
              {/* Full Name */}
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

              {/* Email */}
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

              {/* Phone */}
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

              {/* Role */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  name="userType"
                  value={modalFormData.userType}
                  onChange={handleModalInputChange}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Vendor">Vendor</option>
                </select>
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

}

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
        <td className="fw-medium">{user.name || "N/A"}</td>
        <td className="text-muted d-none d-md-table-cell">{user.email || "N/A"}</td>
        <td className="text-muted d-none d-lg-table-cell">{user.phone || "N/A"}</td>
        <td className="fw-medium">{user.id || "N/A"}</td>
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
              onClick={() => onBlockToggle(user.id, user.blocked)}
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
          placeholder="0344 1234567"
          required
        />
      </div>

      {/* ❌ Removed the User ID field */}

      <div className="col-md-6">
        <label className="form-label">Role</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={onInputChange}
          className="form-select"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Vendor">Vendor</option>
        </select>
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
