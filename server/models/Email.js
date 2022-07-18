const mongoose = require("../database")
const Schema = mongoose.Schema

const EmailSchema = new Schema({
    email: { type: String, },
    browsers: [{ type: Number, }],
    devices: [{ type: String }],
    createdAt: { type: Date, default: Date.now, },
    buff: Buffer
})

const Email = mongoose.model('Email', EmailSchema)

module.exports = Email
