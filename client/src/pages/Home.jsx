import React from 'react'
import { Link } from "react-router-dom"
import logo from '../assets/cms.png'

const Home = () => {
  return (
    <div className="app-wrapper">
      {/* Header */}
      <div className="header shadow-sm bg-white">
        <div className="container">
          <div className="row align-items-center py-2">
            <div className="col-sm-3 text-start d-flex justify-content-start">
              <img src={logo} className="logo" alt="University Logo" />
            </div>
            <div className="col-sm-6 text-center d-flex flex-column align-items-center justify-content-center">
              <h5 className="mb-0 fw-bold text-dark">Lalit Narayan Mithila University</h5>
              <small className="text-muted text-uppercase" style={{fontSize: '11px', letterSpacing: '0.5px'}}>
                Grievance Redressal System
              </small>
            </div>
            <div className="col-sm-3 text-end d-flex justify-content-end">
              <button type="button" className="btn btn-outline-primary btn-sm">
                <i className="bi bi-telephone me-1"></i> Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container flex-grow-1 d-flex flex-column justify-content-center py-3">
        
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Grievance Redressal Portal</h2>
          <p className="text-muted mb-0">Submit, Track and Resolve Your Complaints</p>
        </div>

        <div className="row g-4 justify-content-center">
          
          {/* Register Card */}
          <div className="col-sm-4">
            <div className="card action-card text-center p-3 h-100 border-0 shadow-sm d-flex flex-column align-items-center justify-content-between">
              <div className="icon-box bg-light text-success mb-2">
                <i className="bi bi-pencil-square fs-2"></i>
              </div>
              <h5 className="fw-bold mb-1">Register</h5>
              <p className="text-muted small mb-3">Create a new complaint</p>
              <Link to="/register" className="btn btn-success mt-auto px-4 text-decoration-none">Register</Link>
            </div>
          </div>

          {/* Student Login Card */}
          <div className="col-sm-4">
            <div className="card action-card text-center p-3 h-100 border-0 shadow-sm d-flex flex-column align-items-center justify-content-between">
              <div className="icon-box bg-light text-primary mb-2">
                <i className="bi bi-person-circle fs-2"></i>
              </div>
              <h5 className="fw-bold mb-1">Student Login</h5>
              <p className="text-muted small mb-3">View complaint status</p>
              <Link to="/user-login" className="btn btn-primary mt-auto px-4 text-decoration-none">Login</Link>
            </div>
          </div>

          {/* Admin Login Card */}
          <div className="col-sm-4">
            <div className="card action-card text-center p-3 h-100 border-0 shadow-sm d-flex flex-column align-items-center justify-content-between">
              <div className="icon-box bg-light text-dark mb-2">
                <i className="bi bi-shield-lock fs-2"></i>
              </div>
              <h5 className="fw-bold mb-1">Admin Login</h5>
              <p className="text-muted small mb-3">Manage complaints</p>
              <Link to="/adminlogin" className="btn btn-dark mt-auto px-4 text-decoration-none">Login</Link>
            </div>
          </div>

        </div>

        {/* Info Boxes */}
        <div className="row g-3 mt-3">
          <div className="col-sm-6">
            <div className="d-flex align-items-center p-2 bg-white shadow-sm border">
              <i className="bi bi-envelope-fill fs-4 text-primary me-3 ms-2"></i>
              <div>
                <div className="fw-bold small">Email Us</div>
                <small className="text-muted">support@lnmu.ac.in</small>
              </div>
            </div>
          </div>
          
          {/* <div className="col-sm-4">
            <div className="d-flex align-items-center p-2 bg-white shadow-sm border">
              <i className="bi bi-clock-history fs-4 text-warning me-3 ms-2"></i>
              <div>
                <div className="fw-bold small">Office Hours</div>
                <small className="text-muted">10 AM - 5 PM</small>
              </div>
            </div>
          </div> */}
          
          <div className="col-sm-6">
            <div className="d-flex align-items-center p-2 bg-white shadow-sm border">
              <i className="bi bi-question-circle-fill fs-4 text-success me-3 ms-2"></i>
              <div>
                <div className="fw-bold small">Need Help?</div>
                <small className="text-muted">Contact Support</small>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center py-3 border-top bg-white">
        <p className="text-muted mb-0 small">&copy; 2026 Lalit Narayan Mithila University</p>
      </footer>
    </div>
  )
}

export default Home