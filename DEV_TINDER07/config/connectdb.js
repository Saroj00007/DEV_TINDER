// In this file we are going to connect mongodb to the required node or other thing 

const mongoose = require("mongoose")

const connectdb = async () => {
    await  mongoose.connect("mongodb+srv://sarojofficial5856_db_user:saroj@sarojcluster.qu4hgf1.mongodb.net/")
} 

module.exports = connectdb

 