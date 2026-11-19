import React, { useState } from "react";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";

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

            const token = localStorage.getItem("adminToken");

            const res = await axios.put(
                "http://localhost:2411/api/admin/changePassword",
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

            if (res.data.msg === "Password Changed Successfully") {

                setData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

            }

        } catch (err) {

            console.log(err);
            showToast("Server error. Please try again.", "danger");

        }

    };

    return (
        <div className="container py-5">
            <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />

            <div className="row justify-content-center">

                <div className="col-lg-6 col-md-8">

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Change Password
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Your Old Password"
                                        name="oldPassword"
                                        value={data.oldPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Your New Password"
                                        name="newPassword"
                                        value={data.newPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm Your New Password"
                                        name="confirmPassword"
                                        value={data.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="text-center">

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg px-5"
                                    >
                                        Change Password
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChangePassword;
