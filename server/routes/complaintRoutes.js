const express = require("express");
const Complaint = require("../models/Complaint");
const jwt = require("jsonwebtoken");

const routes = express.Router();


routes.post("/register", async (req, res) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.json({
                msg: "Token Not Found"
            });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const { complaintType, description } = req.body;

        const complaint = new Complaint({
            student: verify.id,
            complaintType,
            description,
            status: "Pending"
        });

        await complaint.save();

        return res.json({
            msg: "Complaint Registered Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: err.message
        });

    }

});

routes.get("/show", async (req, res) => {

    try {

        const { status } = req.query;

        let filter = {};

        if (status && status !== "All") {
            filter.status = status;
        }

        const complaints = await Complaint.find(filter)
            .populate("student", "name email")
            .populate("complaintType", "name");

        return res.json({
            msg: "Data fetched",
            complaints: complaints
        });

    } catch (err) {

        return res.json({
            msg: err.message
        });

    }

});

routes.get("/myComplaint", async (req, res) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.json({
                msg: "Token Not Found"
            });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const complaints = await Complaint.find({
            student: verify.id
        })
            .populate("complaintType", "name");

        return res.json({
            msg: "Data Fetched",
            complaints
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

routes.put("/updateStatus/:id", async (req, res) => {

    try {

        const { status } = req.body;

        await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                status: status
            }
        );

        return res.json({
            msg: "Status Updated Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

module.exports = routes;