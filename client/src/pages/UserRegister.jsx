import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import logo from '../assets/cms.png'
import ToastMessage from "../components/ToastMessage";
import { BASE_URL } from "../config";

const UserRegister = () => {

  const [data, setData] = useState({
    name: "",
    fname: "",
    email: "",
    mobile: "",
    college: "",
    course: "",
    session: "",
    enrollment: "",
    password: "",
    dob: "",
    gender: "",
    address: ""
  });

  const [college, setCollege] = useState([]);
  const [session, setSession] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });

    console.log(data);

  };

  const fetchCollege = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/college/show`);
      setCollege(res.data.college);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSession = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/session/show`);
      setSession(res.data.Session);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCollege();
    fetchSession();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {

      const res = await axios.post(
        `${BASE_URL}/api/user/register`,
        data
      );

      showToast(res.data.msg, res.data.msg === "User Registered Successfully" ? "success" : "danger");

      if (res.data.msg === "User Registered Successfully") {
        setData({
          name: "",
          fname: "",
          email: "",
          mobile: "",
          college: "",
          course: "",
          session: "",
          enrollment: "",
          password: "",
          dob: "",
          gender: "",
          address: ""
        });
      }

    } catch (err) {
      console.log(err);
      showToast("Something went wrong. Please try again.", "danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-4 bg-light">

      <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />

      <div className="card shadow-sm p-4" style={{ maxWidth: '800px', width: '100%' }}>

        <div className="text-center mb-4">
          <img src={logo} alt="Logo" style={{ width: '60px' }} />
          <h4 className="fw-bold mt-2 mb-0">Student Registration</h4>
          <small className="text-muted">Please fill all details carefully</small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-sm-6">
              <label className="form-label fw-bold">Name</label>
              <input type="text" className="form-control" value={data.name} onChange={handleChange} name="name" required />
            </div>
            <div className="col-sm-6">
              <label className="form-label fw-bold">Father's Name</label>
              <input type="text" className="form-control" value={data.fname} onChange={handleChange} name="fname" required />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-sm-6">
              <label className="form-label fw-bold">Email</label>
              <input type="email" className="form-control" value={data.email} onChange={handleChange} name="email" required />
            </div>
            <div className="col-sm-6">
              <label className="form-label fw-bold">Mobile</label>
              <input type="text" className="form-control" value={data.mobile} onChange={handleChange} name="mobile" required />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-sm-4">
              <label className="form-label fw-bold">College</label>
              <select
                className="form-select"
                name="college"
                value={data.college}
                onChange={handleChange}
                required
              >
                <option value="">Select College</option>

                {
                  college.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))
                }

              </select>
            </div>
            <div className="col-sm-4">
              <label className="form-label fw-bold">Course</label>
              <select className="form-select" value={data.course} onChange={handleChange} name="course" required>
                <option value="">Select Course</option>
                <option value="ba">B.A</option>
                <option value="bsc">B.Sc</option>
                <option value="bsc">B-Tech</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label className="form-label fw-bold">Session</label>
              <select
                className="form-select"
                name="session"
                value={data.session}
                onChange={handleChange}
                required
              >
                <option value="">Select Session</option>

                {
                  session.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))
                }

              </select>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-sm-4">
              <label className="form-label fw-bold">Enrollment No.</label>
              <input type="text" className="form-control" value={data.enrollment} onChange={handleChange} name="enrollment" required />
            </div>
            <div className="col-sm-4">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control" value={data.password} onChange={handleChange} name="password" required />
            </div>
            <div className="col-sm-4">
              <label className="form-label fw-bold">Date of Birth</label>
              <input type="date" className="form-control" value={data.dob} onChange={handleChange} name="dob" required />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <label className="form-label fw-bold">Gender</label>
              <select className="form-select" name="gender" value={data.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label fw-bold">Address</label>
              <input type="text" className="form-control" value={data.address} onChange={handleChange} name="address" required />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success fw-bold">
              Register Account
            </button>
          </div>

        </form>

        <div className="text-center mt-3">
          <Link to="/user-login" className="text-decoration-none small text-muted">
            Already have an account? Login
          </Link>
        </div>

      </div>
    </div>
  )
}

export default UserRegister
