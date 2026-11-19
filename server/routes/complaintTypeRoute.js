const express = require('express');
const ComplaintType = require('../models/ComplaintType');

const routes = express.Router();

// Register Complaint Type
routes.post('/register', async (req, res) => {
    try {
        const { name, description } = req.body;

        const data = await ComplaintType.findOne({ name });

        if (data) {
            return res.json({ msg: "Complaint Type Already Exists" });
        }

        const complaint = new ComplaintType({
            name,
            description,
            status: "active"
        });

        await complaint.save();

        return res.json({ msg: "Complaint Type Registered Successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});


// Show All (except deleted)
routes.get('/show', async (req, res) => {
    try {
        const data = await ComplaintType.find({
            status: { $ne: "delete" }
        });

        return res.json({
            msg: "Data Fetched",
            complaintType: data
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});


// Update
routes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        await ComplaintType.findByIdAndUpdate(id, {
            name,
            description
        });

        return res.json({
            msg: "Complaint Type Updated"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Server Error"
        });
    }
});


// Soft Delete
routes.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        await ComplaintType.findByIdAndUpdate(id, {
            status: "delete"
        });

        return res.json({
            msg: "Complaint Type Deleted Successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Server Error"
        });
    }
});

// Active Complaint Types
routes.get('/active', async (req, res) => {
    try {

        const data = await ComplaintType.find({
            status: "active"
        });

        return res.json({
            msg: "Complaint Types Fetched",
            complaintType: data
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Server Error"
        });
    }
});

// Block / Unblock
routes.patch('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        await ComplaintType.findByIdAndUpdate(id, {
            status
        });

        return res.json({
            msg: "Status Updated"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Server Error"
        });
    }
});

module.exports = routes;