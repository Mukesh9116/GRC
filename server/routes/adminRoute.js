const express = require("express");
const routes = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ===================== ADMIN REGISTER =====================

routes.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Allow only one admin
        const isExists = await Admin.countDocuments();

        if (isExists > 0) {
            return res.json({
                msg: "Admin already exists"
            });
        }

        // Check email
        const user = await Admin.findOne({ email });

        if (user) {
            return res.json({
                msg: "Email already exists"
            });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create Admin
        const admin = new Admin({
            name,
            email,
            password: hashPassword
        });

        await admin.save();

        return res.json({
            msg: "Admin Registered Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: "Admin Not Registered"
        });

    }

});

// ===================== ADMIN LOGIN =====================

routes.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await Admin.findOne({ email });

        if (!user) {
            return res.json({
                msg: "Email Not Found"
            });
        }

        const checkPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!checkPassword) {
            return res.json({
                msg: "Password Incorrect"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            msg: "success",
            adminId: user._id,
            name: user.name,
            token
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: "Server Error"
        });

    }

});

// ===================== CHANGE PASSWORD =====================

routes.put("/changePassword", async (req, res) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.json({
                msg: "Token Not Found"
            });
        }

        const verify = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const { oldPassword, newPassword } = req.body;

        const admin = await Admin.findById(verify.id);

        if (!admin) {
            return res.json({
                msg: "Admin Not Found"
            });
        }

        const checkPassword = await bcrypt.compare(
            oldPassword,
            admin.password
        );

        if (!checkPassword) {
            return res.json({
                msg: "Old Password Incorrect"
            });
        }

        const hashPassword = await bcrypt.hash(
            newPassword,
            10
        );

        admin.password = hashPassword;

        await admin.save();

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

module.exports = routes;