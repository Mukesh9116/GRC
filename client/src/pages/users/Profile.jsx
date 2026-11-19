import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    // Start as null so we know when it's loading
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const res = await axios.get(
                "http://localhost:2411/api/user/profile",
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            setData(res.data.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    // 1. Frontend Loading State
    if (loading) {
        return (
            <div className="container-fluid p-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. Frontend Empty/Error State (if backend returns nothing)
    if (!data) {
        return (
            <div className="container-fluid p-5">
                <div className="alert alert-warning text-center">
                    No profile data found.
                </div>
            </div>
        );
    }

    // 3. Clean array to prevent repeating the exact same HTML over and over
    const profileFields = [
        { label: "Name", value: data.name },
        { label: "Father Name", value: data.fname },
        { label: "Email", value: data.email },
        { label: "Mobile", value: data.mobile },
        { label: "College", value: data.college?.name },
        { label: "Course", value: data.course },
        { label: "Session", value: data.session?.name },
        { label: "Enrollment", value: data.enrollment },
        { 
            label: "Date of Birth", 
            value: data.dob ? new Date(data.dob).toLocaleDateString() : "N/A" 
        },
        { label: "Gender", value: data.gender },
    ];

    return (
        <div className="container-fluid">
            <div className="card border-0 shadow rounded-4">
                
                <div className="card-header bg-white py-3">
                    <h4 className="fw-bold mb-0">My Profile</h4>
                </div>

                <div className="card-body">
                    <div className="row">
                        
                        {/* 4. Map through the array to render fields cleanly */}
                        {profileFields.map((field, index) => (
                            <div className="col-md-6 mb-3" key={index}>
                                <label className="fw-bold d-block mb-1">
                                    {field.label}
                                </label>
                                <p className="mb-0 text-muted">
                                    {field.value || "N/A"}
                                </p>
                            </div>
                        ))}

                        {/* Address takes full width (col-md-12) */}
                        <div className="col-md-12 mb-3">
                            <label className="fw-bold d-block mb-1">Address</label>
                            <p className="mb-0 text-muted">
                                {data.address || "N/A"}
                            </p>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Profile;