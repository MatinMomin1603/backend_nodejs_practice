const express = require("express");
const router = express.Router();
const empModel = require("../models/empModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const moongoose = require('mongoose');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "matinmomin13@gmail.com",
        pass: "mahnaz@1625"
    }
})

router.get("/employee", async(req, res) => {
    try {
        const get = await empModel.find().sort({ _id: -1 });
        // res.status(200).send(get);
        res.json({ status: true, data: get }).status(200);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/employee/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const get = await empModel.findOne({ _id });
        if (get) {
            res.status(200).send(get)
        } else {
            res.status(202).send("No Data Found");
        }
    } catch (error) {
        res.status(400).send("Something Went Wrong");

    }
})

router.post("/employee", async(req, res) => {
    try {
        const getdata = new empModel(req.body)
        getdata.password = await bcrypt.hash(getdata.password, 10)
        const get = await getdata.save();
        if (get) {
            // const mailOption = {
            //     from: "matinmomin13@gmail.com",
            //     to: "matin.m@reapmind.com",
            //     subject: "Something",
            //     text: "Hello texted successfully"
            // }

            // transport.sendMail(mailOption, (err, info) => {
            //     if (err) {
            //         console.log('err :', err);
            //     } else {
            //         console.log('Successfully send', info.response);
            //     }
            // })
            res.status(200).send(get);
        } else {
            res.status(202).send("Something Went Wrong");
        }
    } catch (error) {
        console.log('error :', error);
        res.status(400).send(error);
    }
})


router.patch("/employee", async(req, res) => {
    try {
        const _id =  moongoose.Types.ObjectId(req.body._id) ;
        const query = {$set: {active:false}};
        const updatedData = await empModel.update({_id}, query);
        console.log('updatedData :', updatedData);
        res.status(200).send(updatedData);
    } catch (error) {
        console.log('error :', error);
        res.status(400).send(error);

    }
})

router.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        let password = req.body.password;
        let get = await empModel.findOne({ email });
        const getPass = await bcrypt.compare(password, get.password)
        if (get && getPass) {
            res.status(200).send(get);
        } else {
            res.status(200).send("Invalid Credentials");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})



module.exports = router;