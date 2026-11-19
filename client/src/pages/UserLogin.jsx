import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cms.png";
import ToastMessage from "../components/ToastMessage";
import { BASE_URL } from "../config";

const UserLogin = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    enrollment: "",
    password: ""
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `${BASE_URL}/api/user/login`,
        data
      );

      if (res.data.msg === "Login Successfully" && res.data.token) {

        localStorage.removeItem("user");
        localStorage.removeItem("userToken");

        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("userToken", res.data.token);

        showToast("Login successful. Welcome back!");
        setTimeout(() => navigate("/user"), 350);
      } else {
        showToast(res.data.msg, "danger");
      }

    } catch (err) {

      console.log(err);
      showToast("Something went wrong. Please try again.", "danger");

    }
  };

  return (
    <div className="auth-wrapper">
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />
      <div className="auth-card">

        <div className="text-center mb-4">
          <img src={logo} alt="Logo" style={{ width: '60px' }} />
          <h4 className="fw-bold mt-2 mb-0">Student Login</h4>
          <small className="text-muted">Track your complaint status</small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small">Enrollment Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 2023XXXXX"
              name="enrollment"
              value={data.enrollment}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold small">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">Login to Dashboard</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register" className="text-decoration-none small">
            New Student? Register Here
          </Link>
        </div>

      </div>
    </div>
  )
}

export default UserLogin
