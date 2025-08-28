import React from 'react'
import Navbar from './components/Navbar/Navbar' 
import Footer from './components/Footer/Footer'
import Features from './pages/Features'
import Vender from './pages/Vender'
import Admin from './pages/Admin'
import AllBooks from './pages/AllBooks'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
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
              <Route path="/allbooks" element={<AllBooks />} />
              <Route path="/features" element={<Features />} />
              <Route path="/vender" element={<Vender />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>

  )
}

export default App
