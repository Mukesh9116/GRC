const express = require("express");
const User = require("../models/User");

const routes = express.Router();

const bcrypt = require("bcrypt");
const Complaint = require("../models/Complaint");
const Discussion = require("../models/Discussion");
const jwt = require("jsonwebtoken");

// Register User
routes.post("/register", async (req, res) => {

    try {

        const {
            name,
            fname,
            email,
            mobile,
            college,
            course,
            session,
            enrollment,
            password,
            dob,
            gender,
            address
        } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return res.json({
                msg: "Email Already Exists"
            });
        }

        const checkEnrollment = await User.findOne({ enrollment });

        if (checkEnrollment) {
            return res.json({
                msg: "Enrollment Number Already Exists"
            });
        }

        const user = new User({
            name,
            fname,
            email,
            mobile,
            college,
            course,
            session,
            enrollment,
            password: hashPassword,
            dob,
            gender,
            address,
            status: "active"
        });

        await user.save();

        return res.json({
            msg: "User Registered Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: err.message
        });

    }

});


// User Login
routes.post("/login", async (req, res) => {

    try {

        const { enrollment, password } = req.body;

        // Check Enrollment
        const user = await User.findOne({ enrollment })
            .populate("college")
            .populate("session");

        if (!user) {
            return res.json({
                msg: "Invalid Enrollment Number"
            });
        }

        // Check Password
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.json({
                msg: "Invalid Password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.json({
            msg: "Login Successfully",
            user,
            token
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });

    }

});

routes.get("/profile", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verify.id)
            .populate("college", "name")
            .populate("session", "name");

        return res.json({
            msg: "Profile Fetched",
            user
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

routes.put("/changePassword", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(verify.id);

        const check = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!check) {
            return res.json({
                msg: "Old Password Incorrect"
            });
        }

        const hashPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await User.findByIdAndUpdate(
            verify.id,
            {
                password: hashPassword
            }
        );

        return res.json({
            msg: "Password Changed Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

routes.get("/dashboard", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const totalComplaints = await Complaint.countDocuments({
            student: verify.id
        });

        const pendingComplaints = await Complaint.countDocuments({
            student: verify.id,
            status: "Pending"
        });

        const closedComplaints = await Complaint.countDocuments({
            student: verify.id,
            status: "Closed"
        });

        const discussionQuestions = await Discussion.countDocuments({
            student: verify.id,
            status: "active"
        });

        return res.json({
            totalComplaints,
            pendingComplaints,
            closedComplaints,
            discussionQuestions
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

routes.get("/show", async (req, res) => {

    try {

        const user = await User.find({
            status: {
                $in: ["active", "blocked"]
            }
        })
            .populate("college", "name")
            .populate("session", "name");

        return res.json({
            msg: "Data Fetched",
            user
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

routes.put("/block/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (user.status === "blocked") {

            await User.findByIdAndUpdate(
                req.params.id,
                {
                    status: "active"
                }
            );

            return res.json({
                msg: "User Unblocked Successfully"
            });

        }

        await User.findByIdAndUpdate(
            req.params.id,
            {
                status: "blocked"
            }
        );

        return res.json({
            msg: "User Blocked Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

routes.get("/blocked", async (req, res) => {

    try {

        const user = await User.find({
            status: "blocked"
        })
        .populate("college", "name")
        .populate("session", "name");

        return res.json({
            msg: "Blocked Users Fetched",
            user
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

module.exports = routes;