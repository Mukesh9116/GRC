import React, { useState, useEffect } from 'react';
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const AddComplaint = () => {

  const [complaintTypes, setComplaintTypes] = useState([]);
  const [data, setData] = useState({ complaintType: '', description: '', document: '' })
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setData({ ...data, document: e.target.files[0] ? e.target.files[0].name : '' })
  }

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!data.complaintType || !data.description) {
    showToast("Please fill all required fields.", "danger");
    return;
  }

  try {

    const token = localStorage.getItem("userToken");

    const res = await axios.post(
      `${BASE_URL}/api/complaint/register`,
      {
        complaintType: data.complaintType,
        description: data.description
      },
      {
        headers: {
          authorization: token
        }
      }
    );

    showToast(res.data.msg, "success");

    setData({
      complaintType: "",
      description: "",
      document: ""
    });

  } catch (err) {

    console.log(err);
    showToast("Something went wrong. Please try again.", "danger");

  }

};

  const getComplaintTypes = async () => {
    try {

      const res = await axios.get(`${BASE_URL}/api/complaintType/show`);

      setComplaintTypes(res.data.complaintType);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComplaintTypes();
  }, []);

  return (
    <div className="container py-2">
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow rounded-4">
            <div className="card-header bg-white py-3"><h4 className="fw-bold mb-0">Add Complaint</h4></div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Complaint Type</label>
                  <select
                    className="form-select"
                    name="complaintType"
                    value={data.complaintType}
                    onChange={handleChange}
                  >

                    <option value="">Select Complaint Type</option>

                    {complaintTypes
                      .filter((item) => item.status === "active")
                      .map((item) => (

                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>

                      ))}

                  </select>
                </div>
                <div className="mb-3"><label className="form-label fw-semibold">Enter Your Complaint</label><textarea className="form-control" rows="5" name="description" value={data.description} onChange={handleChange} placeholder="Write your complaint here"></textarea></div>
        
                <button type="submit" className="btn btn-primary px-4">Submit Complaint</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddComplaint
