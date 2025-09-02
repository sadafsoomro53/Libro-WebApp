// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaUserEdit, FaUserPlus, FaSignOutAlt, FaUserSlash, FaStoreSlash } from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("sub-admin");
  const [muteNotifications, setMuteNotifications] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedVendors, setBlockedVendors] = useState([]);

  // Load blocked users and vendors from localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user-management-data") || "[]");
    const vendors = JSON.parse(localStorage.getItem("vendor-management-data") || "[]");

    setBlockedUsers(users.filter(user => user.blocked));
    setBlockedVendors(vendors.filter(vendor => vendor.blocked));
  }, [activeTab]); // Reload when tab changes

  // Unblock user
  const unblockUser = (id) => {
    const users = JSON.parse(localStorage.getItem("user-management-data") || "[]");
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, blocked: false } : user
    );
    localStorage.setItem("user-management-data", JSON.stringify(updatedUsers));
    setBlockedUsers(updatedUsers.filter(user => user.blocked));
  };

  // Unblock vendor
  const unblockVendor = (id) => {
    const vendors = JSON.parse(localStorage.getItem("vendor-management-data") || "[]");
    const updatedVendors = vendors.map(vendor =>
      vendor.id === id ? { ...vendor, blocked: false } : vendor
    );
    localStorage.setItem("vendor-management-data", JSON.stringify(updatedVendors));
    setBlockedVendors(updatedVendors.filter(vendor => vendor.blocked));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-left"
    >
      <div className="d-flex" style={{ width: "90%", maxWidth: "1300px" }}>
        {/* Sidebar */}
        <div
          className="d-flex flex-column justify-content-between p-3"
          style={{
            width: "280px",
            minHeight: "400px",
            background: "white",
            borderRadius: "20px",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
          }}
        >
          <div>
            {/* Notifications */}
            <div className="d-flex align-items-center justify-content-between mb-3 p-2">
              <div className="d-flex align-items-center gap-2">
                <FaBell size={20} />
                <span>Mute Notifications</span>
              </div>
              <div>
                <div
                  className={`form-check form-switch`}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={muteNotifications}
                    onChange={() => setMuteNotifications(!muteNotifications)}
                  />
                </div>
              </div>
            </div>

            {/* Edit Profile */}
            <div
              className={`d-flex align-items-center gap-2 p-2 mb-3 ${
                activeTab === "edit-profile"
                  ? "text-white"
                  : "text-dark"
              }`}
              style={{
                background:
                  activeTab === "edit-profile"
                    ? "linear-gradient(90deg,#04364A,#2D9596)"
                    : "transparent",
                cursor: "pointer",
                borderRadius: activeTab === "edit-profile" ? "20px" : "0px",
              }}
              onClick={() => setActiveTab("edit-profile")}
            >
              <FaUserEdit />
              <span>Edit Profile</span>
            </div>

            {/* Add Sub-Admin */}
            <div
              className={`d-flex align-items-center gap-2 p-2 mb-3 ${
                activeTab === "sub-admin"
                  ? "text-white"
                  : "text-dark"
              }`}
              style={{
                background:
                  activeTab === "sub-admin"
                    ? "linear-gradient(90deg,#04364A,#2D9596)"
                    : "transparent",
                cursor: "pointer",
                borderRadius: activeTab === "sub-admin" ? "20px" : "0px",
              }}
              onClick={() => setActiveTab("sub-admin")}
            >
              <FaUserPlus />
              <span>Add Sub-Admin</span>
            </div>

            {/* Blocked Users */}
            <div
              className={`d-flex align-items-center gap-2 p-2 mb-3 ${
                activeTab === "blocked-users"
                  ? "text-white"
                  : "text-dark"
              }`}
              style={{
                background:
                  activeTab === "blocked-users"
                    ? "linear-gradient(90deg,#04364A,#2D9596)"
                    : "transparent",
                cursor: "pointer",
                borderRadius: activeTab === "blocked-users" ? "20px" : "0px",
              }}
              onClick={() => setActiveTab("blocked-users")}
            >
              <FaUserSlash />
              <span>Blocked Users</span>
            </div>

            {/* Blocked Vendors */}
            <div
              className={`d-flex align-items-center gap-2 p-2 mb-3 ${
                activeTab === "blocked-vendors"
                  ? "text-white"
                  : "text-dark"
              }`}
              style={{
                background:
                  activeTab === "blocked-vendors"
                    ? "linear-gradient(90deg,#04364A,#2D9596)"
                    : "transparent",
                cursor: "pointer",
                borderRadius: activeTab === "blocked-vendors" ? "20px" : "0px",
              }}
              onClick={() => setActiveTab("blocked-vendors")}
            >
              <FaStoreSlash />
              <span>Blocked Vendors</span>
            </div>
          </div>

          {/* Logout */}
          <div
            className="d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2 text-white"
            style={{
              background: "linear-gradient(90deg,#04364A,#2D9596)",
              cursor: "pointer",
              boxShadow: "3px 3px 10px rgba(0,0,0,0.4)",
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 ms-4 p-5"
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
          }}
        >
          {activeTab === "sub-admin" && (
            <div>
              <h5 className="mb-4">Add Sub-Admin</h5>
              <form style={{ maxWidth: "550px" }}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter username"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    placeholder="Enter Email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter Number"
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    className="btn text-white rounded-pill px-4"
                    style={{ background: "linear-gradient(90deg,#04364A,#2D9596)" }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn text-white rounded-pill px-4"
                    style={{ background: "linear-gradient(90deg,#2D9596,#04364A)" }}
                  >
                    Discard Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "edit-profile" && (
            <div>
              <h5 className="mb-4">Edit Profile</h5>
              <form style={{ maxWidth: "550px" }}>
                <div className="mb-3">
                  <label className="form-label">Edit Username</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter new username"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Edit Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Enter new Password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Change Email</label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    placeholder="Enter New Email"
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    className="btn text-white rounded-pill px-4"
                    style={{ background: "linear-gradient(90deg,#04364A,#2D9596)" }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn text-white rounded-pill px-4"
                    style={{ background: "linear-gradient(90deg,#2D9596,#04364A)" }}
                  >
                    Discard Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "blocked-users" && (
            <div>
              <h5 className="mb-4">Blocked Users ({blockedUsers.length})</h5>
              {blockedUsers.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No blocked users found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>User ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blockedUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="fw-medium">{user.name}</td>
                          <td className="text-muted">{user.email}</td>
                          <td className="text-muted">{user.phone}</td>
                          <td className="fw-medium">{user.userId}</td>
                          <td>
                            <span className="badge bg-danger">Blocked</span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => unblockUser(user.id)}
                            >
                              Unblock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "blocked-vendors" && (
            <div>
              <h5 className="mb-4">Blocked Vendors ({blockedVendors.length})</h5>
              {blockedVendors.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No blocked vendors found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Shop Name</th>
                        <th>Contact</th>
                        <th>CNIC</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blockedVendors.map((vendor) => (
                        <tr key={vendor.id}>
                          <td className="fw-medium">{vendor.name}</td>
                          <td className="text-muted">{vendor.email}</td>
                          <td className="fw-medium">{vendor.shopName}</td>
                          <td className="text-muted">{vendor.contact}</td>
                          <td className="text-muted">{vendor.cnic}</td>
                          <td>
                            <span className="badge bg-danger">Blocked</span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => unblockVendor(vendor.id)}
                            >
                              Unblock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
