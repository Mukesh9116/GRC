const express = require("express");
const Discussion = require("../models/Discussion");
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

        const { title, description } = req.body;

        const discussion = new Discussion({
            student: verify.id,
            title,
            description,
            status: "active"
        });

        await discussion.save();

        return res.json({
            msg: "Discussion Added Successfully"
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

        const discussions = await Discussion.find({
            status: "active"
        })
        .populate("student", "name")
        .sort({ createdAt: -1 });

        return res.json({
            msg: "Data Fetched",
            discussions : discussions
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

routes.put("/delete/:id", async (req, res) => {

    try {

        await Discussion.findByIdAndUpdate(
            req.params.id,
            {
                status: "delete"
            }
        );

        return res.json({
            msg: "Discussion Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.json({
            msg: err.message
        });

    }

});

module.exports = routes;