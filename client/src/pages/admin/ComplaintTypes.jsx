import React, { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const ComplaintTypes = () => {

    const [data, setData] = useState({
        name: "",
        description: ""
    });

    const [complaint, setComplaint] = useState([]);
    const [mode, setEditMode] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const showToast = (message, type = "success") => setToast({ show: true, message, type });

    // Input Change
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    // Register Complaint Type
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            let res;
            if (mode) {
                res = await axios.put(`${BASE_URL}/api/complaintType/${mode}`, data);
            } else {
                res = await axios.post(
                    `${BASE_URL}/api/complaintType/register`,
                    data
                );
            }

            console.log(res.data);

            showToast(mode ? "Complaint type updated successfully." : "Complaint type added successfully.");

            setData({
                name: "",
                description: ""
            });
            setEditMode(null);

            handleFetch();

        } catch (err) {
            console.log(err);
            showToast("Please try again.", "danger");
        }
    };

    // Fetch Complaint Types
    const handleFetch = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/api/complaintType/show`
            );

            console.log("Response:", res.data);
            console.log("Complaint Type:", res.data.complaintType);
            console.log("Is Array:", Array.isArray(res.data.complaintType));

            setComplaint(res.data.complaintType || []);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleEdit = (item) => {
        setData({
            name: item.name,
            description: item.description
        });
        setEditMode(item._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this complaint type?")) {
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/api/complaintType/${id}`);
            showToast("Complaint type deleted successfully.");
            handleFetch();
        } catch (err) {
            console.log(err);
            showToast("Please try again.", "danger");
        }
    };

    console.log("complaint state:", complaint);
    console.log("Is Array:", Array.isArray(complaint));

    return (
        <div className="container py-4">
            <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />

            {/* Form */}

            <div className="row justify-content-center">

                <div className="col-lg-6 col-md-8">

                    <form onSubmit={handleSubmit}>

                        <div className="card border-0 shadow rounded-4 p-4">

                            <h2 className="text-center text-primary fw-bold mb-4">
                                {mode ? "Update Complaint Type" : "Add Complaint Type"}
                            </h2>

                            <div className="mb-4">

                                <label className="form-label fs-5 fw-semibold text-secondary">
                                    Complaint Type
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Complaint Type"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label fs-5 fw-semibold text-secondary">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    placeholder="Enter Description"
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                            <div className="text-center">

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-pill px-5 py-2"
                                >
                                    {mode ? "Update Type" : "Save Type"}
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

            {/* Table */}

            <div className="row mt-5">

                <div className="col-12">

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-header bg-white">

                            <h5 className="fw-bold mb-0">
                                Complaint Type List
                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-light">

                                        <tr>
                                            <th>S No.</th>
                                            <th>Complaint Type</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th className="text-center">
                                                Actions
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {complaint.map((item, index) => (

                                            <tr key={item._id}>

                                                <td>{index + 1}</td>

                                                <td>{item.name}</td>

                                                <td>{item.description}</td>

                                                <td>{item.status}</td>

                                                <td>
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td className="text-center">

                                                    <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm me-2">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>

                                                    <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                            {/* Pagination */}

                            <nav className="mt-4">

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

            </div>

        </div>
    );
};

export default ComplaintTypes;
