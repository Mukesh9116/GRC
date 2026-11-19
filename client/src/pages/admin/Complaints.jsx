import React, { useState, useEffect } from "react";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const Complaints = () => {

  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const getComplaints = async () => {

    try {

      const res = await axios.get(
        `${BASE_URL}/api/complaint/show?status=${status}`
      );

      console.log(res.data);

      setComplaints(res.data.complaints || []);

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getComplaints();
  }, [status]);

  const handleStatusChange = (id, value) => {

    setComplaints((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, status: value }
          : item
      )
    );

  };

  const updateStatus = async (id, status) => {

  try {

    const res = await axios.put(
      `${BASE_URL}/api/complaint/updateStatus/${id}`,
      {
        status
      }
    );

    showToast(res.data.msg, "success");

    getComplaints();

  } catch (err) {

    console.log(err);

  }

};

  return (
    <div className="container-fluid">
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body">

          {/* Heading */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3 className="fw-bold mb-0">
              All Complaints
            </h3>

            <input
              type="text"
              className="form-control w-25"
              placeholder="Search..."
              disabled
            />

          </div>

          {/* Filters */}

          <div className="mb-4">

            <button
              className="btn btn-primary me-2"
              onClick={() => setStatus("All")}
            >
              All
            </button>

            <button
              className="btn btn-outline-warning me-2"
              onClick={() => setStatus("Pending")}
            >
              Pending
            </button>

            <button
              className="btn btn-outline-danger me-2"
              onClick={() => setStatus("Not Processed")}
            >
              Not Processed
            </button>

            <button
              className="btn btn-outline-success"
              onClick={() => setStatus("Closed")}
            >
              Closed
            </button>

          </div>

          {/* Table */}

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>S.No</th>

                  <th>Student</th>

                  <th>Complaint Type</th>

                  <th>Description</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {
                  complaints.length > 0 ? (

                    complaints.map((item, index) => (

                      <tr key={item._id}>

                        <td>{index + 1}</td>

                        <td>
                          {item.student.name}
                          <br />
                          <small>{item.student.email}</small>
                        </td>

                        <td>{item.complaintType.name}</td>

                        <td>{item.description}</td>

                        <td>

                          <select
                            className="form-select form-select-sm"
                            value={item.status}
                            onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Not Processed">Not Processed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>

                        </td>

                        <td>



                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => updateStatus(item._id, item.status)}
                          >
                            Update
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="6" className="text-center">
                        No Complaints Found
                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

          {/* Pagination */}

          <nav>

            <ul className="pagination justify-content-end">

              <li className="page-item disabled">
                <button className="page-link">
                  Previous
                </button>
              </li>

              <li className="page-item active">
                <button className="page-link">
                  1
                </button>
              </li>

              <li className="page-item disabled">
                <button className="page-link">
                  Next
                </button>
              </li>

            </ul>

          </nav>

        </div>

      </div>

    </div>
  );
};

export default Complaints;
