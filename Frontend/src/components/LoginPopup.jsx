import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPopup({ onClose }) {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login', { state: { from: '/allbooks' } })
    onClose()
  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ zIndex: 1200, background: "rgba(0,0,0,0.55)" }}
         onClick={onClose}>
      <div className="bg-white rounded-4 shadow-lg p-5" 
           style={{ maxWidth: 500, animation: "welcomeFade .36s ease" }}
           onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <h2 className="fw-bold text-success mb-3">Login Required</h2>
          <p className="text-muted mb-4">Please login to add items to your cart.</p>
          
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-success px-4 py-2" onClick={handleLogin}>
              Login Now
            </button>
            <button className="btn btn-outline-secondary px-4 py-2" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes welcomeFade {
          from { transform: translateY(12px) scale(.995); opacity: 0 }
          to { transform: translateY(0) scale(1); opacity: 1 }
        }
      `}</style>
    </div>
  )
}
