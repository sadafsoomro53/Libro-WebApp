import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUserTag } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const userData = location.state || {
    username: 'Guest',
    email: 'guest@example.com',
    gender: 'Not specified',
    image: null
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
            <h3 className="fw-bold">{userData.username || 'User'}</h3>
            <p className="text-muted"><FaEnvelope className="me-2" />{userData.email || 'demo@example.com'}</p>
            <p className="text-muted"><FaUserTag className="me-2" />{userData.gender || 'Not specified'}</p>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
            <Link to="/admin" className="btn btn-dark">
              Go to Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
