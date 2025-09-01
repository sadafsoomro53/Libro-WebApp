import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const VendorManagement = () => {
  const [activeTab, setActiveTab] = useState('Add Vendor');
  const [isLoading, setIsLoading] = useState(false);

  const vendors = new Array(4).fill(0).map((_, i) => ({
    id: i + 1,
    name: ['Book World', 'Readers Paradise', 'Literary Haven', 'Page Turner'][i],
    email: ['bookworld@email.com', 'readers@email.com', 'literary@email.com', 'pageturner@email.com'][i],
    cnic: ['42101-1234567-8', '42201-9876543-1', '42301-4567890-2', '42401-2345678-9'][i],
    shopName: ['Book World Store', 'Readers Paradise Shop', 'Literary Haven Books', 'Page Turner Outlet'][i],
    registrationStatus: i === 0 ? 'Approved' : i === 1 ? 'Pending' : i === 2 ? 'Approved' : 'Rejected',
    contact: ['+92 300 1234567', '+92 321 9876543', '+92 333 4567890', '+92 345 2345678'][i],
    books: [125, 89, 67, 203][i],
    joinDate: ['15 Jan 2023', '28 Feb 2023', '12 Mar 2023', '05 Apr 2023'][i],
    rating: [4.5, 4.2, 4.8, 4.0][i],
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
        <h1 className="text-3xl fw-bold text-dark mb-2">Vendor Management</h1>
        <p className="text-primary">Manage all vendor activities and information</p>
      </div>

      {/* Vendor summary card */}
      <div className="rounded p-4 shadow mb-4" style={{ background: "linear-gradient(to right, #15282E 0%, #0F969c 100%)" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="text-2xl fw-semibold text-white">Vendor Management</h3>
            <p className="text-white small">Manage vendor profiles, inventory, and performance</p>
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
            <VendorsTable vendors={vendors} />
          ) : activeTab === 'Vendor Performance' ? (
            <VendorPerformance vendors={vendors} />
          ) : activeTab === 'Inventory Management' ? (
            <InventoryManagement vendors={vendors} />
          ) : (
            <VendorForm />
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------ Vendor Components ------------------ */
function VendorsTable({ vendors }) {
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
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

function VendorPerformance({ vendors }) {
  return (
    <div className="text-center py-4">
      <h4 className="text-dark mb-3">Vendor Performance Metrics</h4>
      <div className="row">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="col-md-3 mb-3">
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

function VendorForm() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    contact: '', 
    address: '', 
    businessType: 'Bookstore',
    status: 'Active'
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Vendor added successfully! - ' + JSON.stringify(form));
    setForm({ name: '', email: '', contact: '', address: '', businessType: 'Bookstore', status: 'Active' });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Vendor Name</label>
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          className="form-control"
          placeholder="Enter vendor name"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          className="form-control"
          placeholder="vendor@email.com"
          type="email"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Contact Number</label>
        <input 
          name="contact" 
          value={form.contact} 
          onChange={handleChange} 
          className="form-control"
          placeholder="+92 300 1234567"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Business Type</label>
        <select 
          name="businessType" 
          value={form.businessType} 
          onChange={handleChange} 
          className="form-select"
        >
          <option value="Bookstore">Bookstore</option>
          <option value="Online Retailer">Online Retailer</option>
          <option value="Publisher">Publisher</option>
          <option value="Distributor">Distributor</option>
        </select>
      </div>

      <div className="col-12">
        <label className="form-label">Address</label>
        <textarea 
          name="address" 
          value={form.address} 
          onChange={handleChange} 
          className="form-control"
          placeholder="Enter complete address"
          rows="3"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Status</label>
        <select 
          name="status" 
          value={form.status} 
          onChange={handleChange} 
          className="form-select"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending Approval</option>
        </select>
      </div>

      <div className="col-12 d-flex justify-content-end gap-2 mt-3">
        <button 
          type="button" 
          onClick={() => setForm({ name: '', email: '', contact: '', address: '', businessType: 'Bookstore', status: 'Active' })} 
          className="btn btn-outline-secondary"
        >
          Reset
        </button>
        <button 
          type="submit" 
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <FaPlus /> Add Vendor
        </button>
      </div>
    </form>
  );
}

export default VendorManagement;
