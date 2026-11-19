import React from "react";
import "./user.css";
import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="admin-wrapper">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">

        {/* Logo */}
        <div className="sidebar-logo">

          <div className="logo-icon">
            <i className="bi bi-mortarboard-fill"></i>
          </div>

          <div>
            <h5 className="mb-0">LNM University</h5>
            <small>Student Portal</small>
          </div>

        </div>

        {/* ================= MAIN ================= */}
        <div className="sidebar-section">

          <p className="sidebar-title">MAIN</p>

          <NavLink
            to="/user"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </NavLink>

        </div>

        {/* ================= COMPLAINTS ================= */}
        <div className="sidebar-section">

          <p className="sidebar-title">COMPLAINTS</p>

          <NavLink
            to="/user/add-complaint"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-plus-circle"></i>
            <span>Add Complaint</span>
          </NavLink>

          <NavLink
            to="/user/my-complaints"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-card-list"></i>
            <span>My Complaints</span>
          </NavLink>

        </div>

        {/* ================= COMMUNITY ================= */}
        <div className="sidebar-section">

          <p className="sidebar-title">COMMUNITY</p>

          <NavLink
            to="/user/discussion-forum"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <i className="bi bi-chat-square-text"></i>
            <span>Discussion Forum</span>
          </NavLink>

        </div>

        {/* ================= ACCOUNT ================= */}
        <div className="sidebar-section">

          <p className="sidebar-title">ACCOUNT</p>

          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-person-circle"></i>
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/user/change-password"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-lock-fill"></i>
            <span>Change Password</span>
          </NavLink>

        </div>

        {/* Logout */}
        <div className="mt-auto">

          <NavLink
            to="/user/logout"
            className="nav-link logout-link"
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </NavLink>

        </div>

      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="main-content">

        <nav className="navbar top-navbar">

          <div className="d-flex align-items-center">


            <h5 className="mb-0 ms-4 fw-bold">
              Good Afternoon, Student 👋
            </h5>

          </div>

          <div className="admin-profile">

            <span className="me-5 fw-semibold">
              Student
            </span>


          </div>

        </nav>

        <div className="container-fluid p-4">

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;
