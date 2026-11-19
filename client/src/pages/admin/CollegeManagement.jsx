import React, { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const CollegeManagement = () => {

  const [data, setData] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e) => {
    setData(() => ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (mode) {
        res = await axios.put(`${BASE_URL}/api/college/${mode}`, data)
      } else {
        res = await axios.post(`${BASE_URL}/api/college/register`, data)
      }
      console.log(res);
      showToast(mode ? "College updated successfully." : "College registered successfully.")
      setData({ name: '', description: '' })
      setEditMode(null)
      handlefetch()
    } catch (err) {
      console.error(err);
      showToast("Please try again.", "danger")

    }
  }

  console.log(data);


  // fetch data
  const [mode, setEditMode] = useState(null)
  const [college, setCollege] = useState([])
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const handlefetch = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/college/show`);

      console.log("Response:", res.data);
      console.log("College Array:", res.data.college);

      setCollege(res.data.college);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handlefetch();
  }, [])

  const handleEdit = (a) => {
    console.log(a);
    setData({
      name:a.name,
      description:a.description
    })
    setEditMode(a._id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/college/${id}`)
      showToast("College deleted successfully.")
      handlefetch()
    } catch (err) {
      console.error(err)
      showToast("Please try again.", "danger")
    }
  }

  console.log(data);
  

  return (
    <div className="container py-4">
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />

      {/* Add College Form */}
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">

          <form method="POST" onSubmit={handleSubmit}>
            <div className="card border-0 shadow rounded-4 p-4">

              <h2 className="text-center text-primary fw-bold mb-4">
                {mode ? "Update College" : "Add New College"}
              </h2>

              <div className="mb-4">
                <label className="form-label fs-5 fw-semibold text-secondary">
                  College Name
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg college-input"
                  placeholder="Enter College Name"
                  onChange={handleChange}
                  value={data.name}
                  name="name"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="form-label fs-5 fw-semibold text-secondary">
                  Description
                </label>

                <textarea
                  className="form-control college-input"
                  rows="4"
                  placeholder="Enter College Description"
                  onChange={handleChange}
                  value={data.description}
                  name="description"
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 py-2 college-btn">
                  {mode ? "Update College" : "Save College"}
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>

      {/* College Table */}
      <div className="row mt-5">
        <div className="col-12">

          <div className="card border-0 shadow rounded-4">
            <div className="card-header bg-white">
              <h5 className="fw-bold mb-0">College List</h5>
            </div>

            <div className="card-body">

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">
                    <tr>
                      <th>S No.</th>
                      <th>College Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {college.map((item, index) => {

                      return (

                        <tr key={item._id}>

                          <td>{index + 1}</td>

                          <td>{item.name}</td>

                          <td>{item.description}</td>

                          <td>{item.status}</td>

                          <td className="text-center">

                          <button onClick={() => {handleEdit(item)}} className="btn btn-warning btn-sm me-2">
                              <i className="bi bi-pencil-square"></i>
                            </button>

                            <button onClick={() => {handleDelete(item._id)}} className="btn btn-danger btn-sm">
                              <i className="bi bi-trash"></i>
                            </button>

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </table>
              </div>

              {/* Pagination */}
              <nav className="mt-4">
                <ul className="pagination justify-content-end mb-0">

                  <li className="page-item disabled">
                    <button className="page-link">Previous</button>
                  </li>

                  <li className="page-item active">
                    <button className="page-link">1</button>
                  </li>

                  <li className="page-item">
                    <button className="page-link">2</button>
                  </li>

                  <li className="page-item">
                    <button className="page-link">3</button>
                  </li>

                  <li className="page-item">
                    <button className="page-link">Next</button>
                  </li>

                </ul>
              </nav>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CollegeManagement;
