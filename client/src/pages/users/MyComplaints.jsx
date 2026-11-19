import React, { useState, useEffect } from "react";
import axios from "axios";

const MyComplaints = () => {

  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {

    try {

      const token = localStorage.getItem("userToken");

      const res = await axios.get(
        "http://localhost:2411/api/complaint/myComplaint",
        {
          headers: {
            authorization: token
          }
        }
      );

      setComplaints(res.data.complaints);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <div className="container-fluid">

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-header bg-white py-3">
          <h4 className="fw-bold mb-0">
            My Complaints
          </h4>
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>
                  <th>S.No.</th>
                  <th>Complaint Type</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {complaints.length > 0 ? (

                  complaints.map((item, index) => (

                    <tr key={item._id}>

                      <td>{index + 1}</td>

                      <td>{item.complaintType?.name}</td>

                      <td>{item.description}</td>

                      <td>

                        <span
                          className={`badge
                          ${item.status === "Pending"
                              ? "bg-warning text-dark"
                              : item.status === "In Progress"
                                ? "bg-info text-dark"
                                : item.status === "Closed"
                                  ? "bg-success"
                                  : "bg-secondary"
                            }`}
                        >
                          {item.status}
                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center text-muted py-4"
                    >
                      No Complaints Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );

};

export default MyComplaints;