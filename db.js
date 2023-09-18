const mongoose = require("mongoose")
require("dotenv").config();
const mongoURL = `mongodb+srv://vivek:vivek@cluster0.c2udwjp.mongodb.net/webledger?retryWrites=true&w=majority`

const connection = mongoose.connect(mongoURL)

module.exports = {connection}