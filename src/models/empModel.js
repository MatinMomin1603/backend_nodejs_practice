const mongoose = require("mongoose");
const validator = require("validator");


const empSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    // type: {
    //     required: true,
    //     type: String
    // },
    // cmpName: {
    //     required: true,
    //     type: String
    // },
    active: {
        type: Boolean
    },
    // date: {
    //     type: Date,
    //     default: new Date()
    // },
    email: {
        type: String,
    },
    password: {
        type: String
    },
})



const empModel = new mongoose.model("demodatas", empSchema);


module.exports = empModel;