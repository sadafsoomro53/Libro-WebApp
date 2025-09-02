import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUserTag, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    gender: ''
  });

  const userData = user || {
    username: 'Guest',
    email: 'guest@example.com',
    gender: 'Not specified',
    image: null
  };

  const handleEdit = () => {
    setFormData({
      username: userData.username || '',
      email: userData.email || '',
      gender: userData.gender || ''
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ 
      background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)'
    }}>
      <div className="card shadow-lg border-0" style={{ 
        maxWidth: 450, 
        width: '90%', 
        borderRadius: 20,
        backgroundColor: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)'
      }}>
        <div className="card-body p-5">
          
          <div className="text-center mb-4" >
            <h2 className="fw-bold mb-2" style={{ color: '#15282E' }}>
              Welcome to Libro
            </h2>
            <p className="text-muted ">
              Your Profile
            </p>
          </div>

          <div className="text-center mb-4">
            <div className="rounded-circle bg-dark d-flex align-items-center justify-content-center mx-auto mb-3" 
            style={{ 
              width: 100, 
              height: 100, 
              backgroundColor: '#15282e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {userData.image ? (
                <img src={userData.image} alt="Profile" className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)' }} />
              ) : (
                <span className="text-white fs-4">{userData.username?.charAt(0)?.toUpperCase() || 'U'}</span>
              )}
            </div>
          </div>

          <div className="text-center mb-4">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Username"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Email"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-control mb-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            ) : (
              <div>
                <h3 className="fw-bold">{userData.username || 'User'}</h3>
                <p className="text-muted"><FaEnvelope className="me-2" />{userData.email || 'demo@example.com'}</p>
                <p className="text-muted"><FaUserTag className="me-2" />{userData.gender || 'Not specified'}</p>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center gap-3">
            {isEditing ? (
              <div>
                <button onClick={handleSave} className="btn btn-success me-2">
                  <FaSave className="me-1" /> Save
                </button>
                <button onClick={handleCancel} className="btn btn-secondary">
                  <FaTimes className="me-1" /> Cancel
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleEdit} className="btn btn-primary me-2">
                  <FaEdit className="me-1" /> Edit Profile
                </button>
                <button onClick={handleLogout} className="btn btn-danger me-2">
                  Logout
                </button>
                <Link to="/admin" className="btn btn-dark">
                  Go to Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
