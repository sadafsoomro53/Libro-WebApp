import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const LS_VENDORS = "vendor-management-data";

// Seed data for vendors
const seedVendors = [
  {
    id: 1,
    name: 'Book World',
    email: 'bookworld@email.com',
    cnic: '42101-1234567-8',
    shopName: 'Book World Store',
    registrationStatus: 'Approved',
    contact: '+92 300 1234567',
    books: 125,
    joinDate: '15 Jan 2023',
    rating: 4.5,
    address: '123 Main St, City, Country',
    businessType: 'Bookstore',
    blocked: false
  },
  {
    id: 2,
    name: 'Readers Paradise',
    email: 'readers@email.com',
    cnic: '42201-9876543-1',
    shopName: 'Readers Paradise Shop',
    registrationStatus: 'Pending',
    contact: '+92 321 9876543',
    books: 89,
    joinDate: '28 Feb 2023',
    rating: 4.2,
    address: '456 Oak Ave, City, Country',
    businessType: 'Bookstore',
    blocked: false
  },
  {
    id: 3,
    name: 'Literary Haven',
    email: 'literary@email.com',
    cnic: '42301-4567890-2',
    shopName: 'Literary Haven Books',
    registrationStatus: 'Approved',
    contact: '+92 333 4567890',
    books: 67,
    joinDate: '12 Mar 2023',
    rating: 4.8,
    address: '789 Pine Rd, City, Country',
    businessType: 'Online Retailer',
    blocked: false
  },
  {
    id: 4,
    name: 'Page Turner',
    email: 'pageturner@email.com',
    cnic: '42401-2345678-9',
    shopName: 'Page Turner Outlet',
    registrationStatus: 'Rejected',
    contact: '+92 345 2345678',
    books: 203,
    joinDate: '05 Apr 2023',
    rating: 4.0,
    address: '321 Elm St, City, Country',
    businessType: 'Publisher',
    blocked: true
  },
  {
    id: 5,
    name: 'Book Haven',
    email: 'bookhaven@email.com',
    cnic: '42501-3456789-0',
    shopName: 'Book Haven Store',
    registrationStatus: 'Approved',
    contact: '+92 356 3456789',
    books: 156,
    joinDate: '18 May 2023',
    rating: 4.3,
    address: '654 Oak St, City, Country',
    businessType: 'Bookstore',
    blocked: true
  }
];

const VendorManagement = ({ initialTab = 'Add Vendor' }) => {
  // State for vendors data
  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem(LS_VENDORS);
    return saved ? JSON.parse(saved) : seedVendors;
  });

  // Toggle block/unblock vendor
  const toggleBlockVendor = (id) => {
    const vendor = vendors.find(v => v.id === id);
    const isBlocking = !vendor.blocked;

    if (isBlocking) {
      if (window.confirm(`Are you sure you want to block ${vendor.name}? They will be added to the blocked vendors list in Settings.`)) {
        setVendors(vendors.map(v => {
          if (v.id === id) {
            return { ...v, blocked: true };
          }
          return v;
        }));
        // Show navigation hint
        setTimeout(() => {
          alert(`Vendor ${vendor.name} has been blocked. You can manage blocked vendors in Settings > Blocked Vendors.`);
        }, 100);
      }
    } else {
      setVendors(vendors.map(v => {
        if (v.id === id) {
          return { ...v, blocked: false };
        }
        return v;
      }));
    }
  };

  // State for form handling
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    shopName: '',
    businessType: 'Bookstore',
    registrationStatus: 'Pending',
    address: ''
  });

  // State for edit modal
  const [editingVendorModal, setEditingVendorModal] = useState(null);
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    shopName: '',
    businessType: 'Bookstore',
    registrationStatus: 'Pending',
    address: ''
  });

  // State for viewing vendor details
  const [viewingVendor, setViewingVendor] = useState(null);

  // Save vendors to localStorage whenever vendors change
  useEffect(() => {
    localStorage.setItem(LS_VENDORS, JSON.stringify(vendors));
  }, [vendors]);

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
    if (!modalFormData.name.trim() || !modalFormData.email.trim() || !modalFormData.contact.trim() || !modalFormData.cnic.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const vendorData = {
      ...modalFormData,
      id: editingVendorModal.id,
      joinDate: editingVendorModal.joinDate,
      books: editingVendorModal.books,
      rating: editingVendorModal.rating
    };

    setVendors(vendors.map(vendor =>
      vendor.id === editingVendorModal.id ? vendorData : vendor
    ));

    setEditingVendorModal(null);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingVendorModal(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.contact.trim() || !formData.cnic.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const vendorData = {
      ...formData,
      id: editingVendor ? editingVendor.id : Date.now(),
      joinDate: editingVendor ? editingVendor.joinDate : new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      books: editingVendor ? editingVendor.books : Math.floor(Math.random() * 200) + 50,
      rating: editingVendor ? editingVendor.rating : (Math.random() * 2 + 3).toFixed(1)
    };

    if (editingVendor) {
      // Update existing vendor
      setVendors(vendors.map(vendor =>
        vendor.id === editingVendor.id ? vendorData : vendor
      ));
    } else {
      // Add new vendor
      setVendors([...vendors, vendorData]);
    }

    // Reset form
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      contact: '',
      cnic: '',
      shopName: '',
      businessType: 'Bookstore',
      registrationStatus: 'Pending',
      address: ''
    });
    setEditingVendor(null);
    setShowForm(false);
  };

  // Start editing a vendor
  const startEdit = (vendor) => {
    setEditingVendorModal(vendor);
    setModalFormData(vendor);
  };

  // Delete a vendor
  const deleteVendor = (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setVendors(vendors.filter(vendor => vendor.id !== id));
    }
  };

  // View vendor details
  const viewVendor = (vendor) => {
    setViewingVendor(vendor);
  };

  // Close view modal
  const closeViewModal = () => {
    setViewingVendor(null);
  };

  const [activeTab, setActiveTab] = useState('Add Vendor');
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
        <h1 className="text-3xl fw-bold text-dark mb-2">Vendor Management</h1>
        <p className="text-primary">Manage all vendor accounts and information</p>
      </div>

      {/* Vendor summary card */}
      <div className="rounded p-4 shadow mb-4" style={{ background: "linear-gradient(to right, #15282E 0%, #0F969c 100%)" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="text-2xl fw-semibold text-white">Vendor Management</h3>
            <p className="text-white small">Manage vendor profiles, accounts, and activities</p>
          </div>
          <div className="d-flex gap-2">
            <div className="px-3 py-1 rounded text-white small fw-medium" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              {activeTab}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {['Add Vendor', 'View Vendors', 'Vendor Performance', 'Inventory Management'].map((t) => (
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
          ) : activeTab === 'View Vendors' ? (
            <VendorsTable vendors={vendors} onView={viewVendor} onEdit={startEdit} onDelete={deleteVendor} onBlockToggle={toggleBlockVendor} />
          ) : activeTab === 'Vendor Performance' ? (
            <VendorPerformance vendors={vendors} />
          ) : activeTab === 'Inventory Management' ? (
            <InventoryManagement vendors={vendors} />
          ) : (
            <VendorForm
              formData={formData}
              editingVendor={editingVendor}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={resetForm}
            />
          )}
        </div>
      </div>

      {/* View Vendor Modal */}
      {viewingVendor && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vendor Details</h5>
                <button type="button" className="btn-close" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <h6>Name:</h6>
                    <p>{viewingVendor.name}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Email:</h6>
                    <p>{viewingVendor.email}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Contact:</h6>
                    <p>{viewingVendor.contact}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>CNIC:</h6>
                    <p>{viewingVendor.cnic}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Shop Name:</h6>
                    <p>{viewingVendor.shopName}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Business Type:</h6>
                    <p>{viewingVendor.businessType}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Registration Status:</h6>
                    <p>
                      <span className={`badge ${
                        viewingVendor.registrationStatus === 'Approved' ? 'bg-success' :
                        viewingVendor.registrationStatus === 'Pending' ? 'bg-warning text-dark' : 'bg-danger'
                      }`}>
                        {viewingVendor.registrationStatus}
                      </span>
                    </p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Books:</h6>
                    <p>{viewingVendor.books}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Rating:</h6>
                    <p>⭐ {viewingVendor.rating}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Join Date:</h6>
                    <p>{viewingVendor.joinDate}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Address:</h6>
                    <p>{viewingVendor.address}</p>
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

      {/* Edit Vendor Modal */}
      {editingVendorModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Vendor</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <form onSubmit={handleModalSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Vendor Name *</label>
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
                      <label className="form-label">Contact Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        value={modalFormData.contact}
                        onChange={handleModalInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CNIC *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cnic"
                        value={modalFormData.cnic}
                        onChange={handleModalInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Shop Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="shopName"
                        value={modalFormData.shopName}
                        onChange={handleModalInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Business Type</label>
                      <select
                        className="form-select"
                        name="businessType"
                        value={modalFormData.businessType}
                        onChange={handleModalInputChange}
                      >
                        <option value="Bookstore">Bookstore</option>
                        <option value="Online Retailer">Online Retailer</option>
                        <option value="Publisher">Publisher</option>
                        <option value="Distributor">Distributor</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Registration Status</label>
                      <select
                        className="form-select"
                        name="registrationStatus"
                        value={modalFormData.registrationStatus}
                        onChange={handleModalInputChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
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
                    Update Vendor
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

/* ------------------ Vendor Components ------------------ */
function VendorsTable({ vendors, onView, onEdit, onDelete, onBlockToggle }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>CNIC</th>
            <th>Shop Name</th>
            <th>Registration Status</th>
            <th>Rating</th>
            <th>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className={vendor.blocked ? 'table-danger' : ''}>
              <td className="fw-medium">{vendor.name}</td>
              <td className="text-muted">{vendor.email}</td>
              <td className="text-muted">{vendor.cnic}</td>
              <td className="fw-medium">{vendor.shopName}</td>
              <td>
                <span className={`badge ${
                  vendor.registrationStatus === 'Approved' ? 'bg-success' :
                  vendor.registrationStatus === 'Pending' ? 'bg-warning text-dark' : 'bg-danger'
                }`}>
                  {vendor.registrationStatus}
                </span>
              </td>
              <td>
                <span className="badge bg-danger text-white px-2 py-1" style={{ whiteSpace: 'nowrap' }}>
                  ⭐ {vendor.rating}
                </span>
              </td>
              <td>
                {vendor.blocked ? (
                  <span className="badge bg-danger">Blocked</span>
                ) : (
                  <span className="badge bg-success">Active</span>
                )}
              </td>
              <td>
                <div className="d-flex gap-1 flex-column flex-sm-row">
                  <button
                    title="View"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onView(vendor)}
                  >
                    <FaEye />
                  </button>
                  <button
                    title="Edit"
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => onEdit(vendor)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    title={vendor.blocked ? "Unblock" : "Block"}
                    className={`btn btn-sm btn-outline-${vendor.blocked ? "success" : "warning"}`}
                    onClick={() => onBlockToggle(vendor.id)}
                  >
                    {vendor.blocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    title="Delete"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(vendor.id)}
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

function VendorPerformance({ vendors }) {
  return (
    <div className="text-center py-4">
      <h4 className="text-dark mb-3">Vendor Performance Metrics</h4>
  <div className="row">
    {vendors.map((vendor) => (
      <div key={vendor.id} className="col-md-6 mb-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6 className="card-title">{vendor.name}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Books:</span>
                  <span className="fw-bold">{vendor.books}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="text-muted small">Rating:</span>
                  <span className="badge bg-danger text-white px-2 py-1" style={{ whiteSpace: 'nowrap' }}>⭐ {vendor.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryManagement({ vendors }) {
  return (
    <div className="text-center py-4">
      <h4 className="text-dark mb-3">Inventory Management</h4>
      <p className="text-muted">Manage vendor inventory levels and stock</p>
      <div className="row">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="card-title">{vendor.name}</h6>
                <div className="progress mb-2">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${Math.min(vendor.books * 0.5, 100)}%` }}
                  >
                    {vendor.books} books
                  </div>
                </div>
                <small className="text-muted">Current inventory level</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VendorForm({ formData, editingVendor, onInputChange, onSubmit, onReset }) {
  return (
    <form onSubmit={onSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Vendor Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="form-control"
          placeholder="Enter vendor name"
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
          placeholder="vendor@email.com"
          type="email"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Contact Number *</label>
        <input
          name="contact"
          value={formData.contact}
          onChange={onInputChange}
          className="form-control"
          placeholder="+92 300 1234567"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">CNIC *</label>
        <input
          name="cnic"
          value={formData.cnic}
          onChange={onInputChange}
          className="form-control"
          placeholder="42101-1234567-8"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Shop Name</label>
        <input
          name="shopName"
          value={formData.shopName}
          onChange={onInputChange}
          className="form-control"
          placeholder="Enter shop name"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Business Type</label>
        <select
          name="businessType"
          value={formData.businessType}
          onChange={onInputChange}
          className="form-select"
        >
          <option value="Bookstore">Bookstore</option>
          <option value="Online Retailer">Online Retailer</option>
          <option value="Publisher">Publisher</option>
          <option value="Distributor">Distributor</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label">Registration Status</label>
        <select
          name="registrationStatus"
          value={formData.registrationStatus}
          onChange={onInputChange}
          className="form-select"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="col-12 mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          name="address"
          value={formData.address}
          onChange={onInputChange}
          rows="3"
          placeholder="Enter complete address"
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
          <FaPlus /> {editingVendor ? 'Update Vendor' : 'Add Vendor'}
        </button>
      </div>
    </form>
  );
}

export default VendorManagement;
