import React, { useState } from "react";
import "./admin.css";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-wrapper">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <i className="bi bi-bank"></i>
          </div>

          <div>
            <h5 className="mb-0">GRS</h5>
            <small>Admin Panel</small>
          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="sidebar-section">
          <p className="sidebar-title">MAIN</p>

          <Link className="nav-link active" to="/admin">
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </Link>
        </div>

        {/* ================= MANAGEMENT ================= */}
        <div className="sidebar-section">
          <p className="sidebar-title">MANAGEMENT</p>

          <Link className="nav-link" to="/admin/colleges">
            <i className="bi bi-bank"></i>
            <span>College Management</span>
          </Link>

          <Link className="nav-link" to="/admin/sessions">
            <i className="bi bi-calendar3"></i>
            <span>Session Management</span>
          </Link>

          <Link className="nav-link" to="/admin/complaint-types">
            <i className="bi bi-tags"></i>
            <span>Complaint Types</span>
          </Link>

          <Link className="nav-link" to="/admin/complaints">
            <i className="bi bi-file-earmark-text"></i>
            <span>Complaints</span>

          </Link>

         

            <Link
              to="discussion-forum"
              className="nav-link"
            >
              <i className="bi bi-chat-dots me-2"></i>
              <span>Discussion Forum</span>

            </Link>

        </div>

        {/* ================= USERS ================= */}
        <div className="sidebar-section">
          <p className="sidebar-title">USERS</p>

          <Link className="nav-link" to="/admin/users">
            <i className="bi bi-people-fill"></i>
            <span>User Management</span>
          </Link>

          <Link className="nav-link" to="/admin/blocked-users">
            <i className="bi bi-slash-circle"></i>
            <span>Blocked Users</span>
          </Link>
        </div>



        {/* ================= ACCOUNT ================= */}
        <div className="sidebar-section">
          <p className="sidebar-title">ACCOUNT</p>

          <Link className="nav-link" to="/admin/change-password">
            <i className="bi bi-person-circle"></i>
            <span>Change Password</span>
          </Link>
        </div>

        {/* Logout */}
        <div className="mt-auto">
          <Link className="nav-link logout-link" to="/admin/logout">
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </Link>
        </div>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">

        <nav className="navbar top-navbar">
          <h1 className="h3 mb-0">GRS Admin Dashboard</h1>

          <div className="admin-profile">
            <span className="me-2">Admin User</span>

            <div className="avatar-circle">
              <i className="bi bi-person-fill"></i>
            </div>
          </div>
        </nav>

        <div className="container-fluid p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;