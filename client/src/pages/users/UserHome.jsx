import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserHome = () => {

  const [dashboard, setDashboard] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    closedComplaints: 0,
    discussionQuestions: 0
  });

  const getDashboard = async () => {

    try {

      const token = localStorage.getItem("userToken");

      const res = await axios.get(
        "http://localhost:2411/api/user/dashboard",
        {
          headers: {
            authorization: token
          }
        }
      );
      console.log(res.data);

      setDashboard(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="container">

      <div className="row g-4 justify-content-center">

        <div className="col-12">
          <h3 className="fw-bold mb-0">Dashboard</h3>
          <p className="text-secondary mb-0">
            Overview of your grievance activity
          </p>
        </div>

        {/* My Complaints */}
        <div className="col-lg-4 col-md-6">

          <div className="card dashboard-card text-center border-0">

            <div className="card-body">

              <div className="dashboard-badge">
                My Complaints
                <span>{dashboard.totalComplaints}</span>
              </div>

              <h3 className="mt-4">
                Total Complaints
              </h3>

              <div className="dashboard-icon text-danger">
                <i className="bi bi-card-list"></i>
              </div>

              <Link
                to="/user/my-complaints"
                className="btn btn-info text-dark fw-bold mt-3 px-4"
              >
                Check
              </Link>

            </div>

          </div>

        </div>

        {/* Pending */}
        <div className="col-lg-4 col-md-6">

          <div className="card dashboard-card text-center border-0">

            <div className="card-body">

              <div className="dashboard-badge">
                Pending
                <span>{dashboard.pendingComplaints}</span>
              </div>

              <h3 className="mt-4">
                Pending Complaints
              </h3>

              <div className="dashboard-icon text-warning">
                <i className="bi bi-clock-history"></i>
              </div>

              <Link
                to="/user/my-complaints"
                className="btn btn-info text-dark fw-bold mt-3 px-4"
              >
                Check
              </Link>

            </div>

          </div>

        </div>

        {/* Closed */}
        <div className="col-lg-4 col-md-6">

          <div className="card dashboard-card text-center border-0">

            <div className="card-body">

              <div className="dashboard-badge">
                Closed
                <span>{dashboard.closedComplaints}</span>
              </div>

              <h3 className="mt-4">
                Closed Complaints
              </h3>

              <div className="dashboard-icon text-success">
                <i className="bi bi-check-circle-fill"></i>
              </div>

              <Link
                to="/user/my-complaints"
                className="btn btn-info text-dark fw-bold mt-3 px-4"
              >
                Check
              </Link>

            </div>

          </div>

        </div>

      </div>

      <div className="row g-4 mt-1">

        <div className="col-lg-4 col-md-6">

          <div className="card dashboard-card text-center border-0">

            <div className="card-body">

              <div className="dashboard-badge">
                Questions
                <span>{dashboard.discussionQuestions}</span>
              </div>

              <h3 className="mt-4">
                Discussion Questions
              </h3>

              <div className="dashboard-icon text-primary">
                <i className="bi bi-chat-square-text"></i>
              </div>

              <Link
                to="/user/discussion-forum"
                className="btn btn-info text-dark fw-bold mt-3 px-4"
              >
                Check
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserHome;  