import React from 'react'
import Navbar from './components/Navbar/Navbar' 
import Footer from './components/Footer/Footer'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserManagement from './pages/UserManagement'
import VendorManagement from './pages/VendorManagement'
import BookManagement from './pages/BookManagement'
import Orders from './pages/Orders'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/ToastProvider'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              {/* Default route redirect to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              {/* Public Routes */}
               <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/vendors" element={<VendorManagement />} />
              <Route path="/books" element={<BookManagement />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contact" element={<Admin />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>

  )
}

export default App
