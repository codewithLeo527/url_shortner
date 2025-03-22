const mongoose = require("mongoose");
const { redirect } = require("react-router-dom");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true, 
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [ { timestamps: {
        type: Number
    }}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
}, {
    timestamps: true,
});


const URL = mongoose.model("url", urlSchema);

module.exports = URL;