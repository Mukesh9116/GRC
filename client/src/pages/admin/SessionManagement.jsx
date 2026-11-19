import React, { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const SessionManagement = () => {

    const [data, setData] = useState({
        name: ""
    });

    const [session, setSession] = useState([]);
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

    // Register Session
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res;
            if (mode) {
                res = await axios.put(`${BASE_URL}/api/session/${mode}`, data);
            } else {
                res = await axios.post(
                    `${BASE_URL}/api/session/register`,
                    data
                );
            }

            console.log(res.data);

            showToast(mode ? "Session updated successfully." : "Session registered successfully.");

            setData({
                name: ""
            });
            setEditMode(null);

            handleFetch();

        } catch (err) {
            console.log(err);
            showToast("Please try again.", "danger");
        }
    };

    // Fetch Sessions
    const handleFetch = async () => {
        try {

            const res = await axios.get(
                `${BASE_URL}/api/session/show`
            );

            console.log(res.data);

            setSession(res.data.Session);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleEdit = (item) => {
        setData({ name: item.name });
        setEditMode(item._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this session?")) {
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/api/session/${id}`);
            showToast("Session deleted successfully.");
            handleFetch();
        } catch (err) {
            console.log(err);
            showToast("Please try again.", "danger");
        }
    };

    return (
        <div className="container py-4">
            <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />

            {/* Form */}
            <div className="row justify-content-center">
                <div className="col-lg-6">

                    <form onSubmit={handleSubmit}>

                        <div className="card shadow border-0 rounded-4 p-4">

                            <h2 className="text-center text-primary fw-bold mb-4">
                                {mode ? "Update Session" : "Add New Session"}
                            </h2>

                            <div className="mb-4">

                                <label className="form-label">
                                    Session Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Session"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="text-center">

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-pill px-5"
                                >
                                    {mode ? "Update Session" : "Save Session"}
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
                                Registered Sessions
                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead className="table-light">

                                        <tr>
                                            <th>S No.</th>
                                            <th>Session</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th className="text-center">
                                                Actions
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {session.map((item, index) => {

                                            return (

                                                <tr key={item._id}>

                                                    <td>{index + 1}</td>

                                                    <td>{item.name}</td>

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

                                            );

                                        })}

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

export default SessionManagement;
