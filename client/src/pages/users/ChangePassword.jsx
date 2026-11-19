import React, { useState } from "react";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const ChangePassword = () => {

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
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

        if (data.newPassword !== data.confirmPassword) {
            showToast("New password and confirm password do not match.", "danger");
            return;
        }

        try {

            const token = localStorage.getItem("userToken");

            const res = await axios.put(
                `${BASE_URL}/api/user/changePassword`,
                {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            showToast(res.data.msg, res.data.msg === "Password Changed Successfully" ? "success" : "danger");

            setData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (err) {

            console.log(err);
            showToast("Something went wrong. Please try again.", "danger");

        }

    };

    const handleReset = () => {

        setData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });

    };

    return (
        <div className="container py-2">
            <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card border-0 shadow rounded-4">

                        <div className="card-header bg-white py-3">
                            <h4 className="fw-bold mb-0">
                                Change Password
                            </h4>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Current Password
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="oldPassword"
                                        value={data.oldPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        New Password
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="newPassword"
                                        value={data.newPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="confirmPassword"
                                        value={data.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    className="btn btn-primary me-2"
                                    type="submit"
                                >
                                    Update Password
                                </button>

                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
