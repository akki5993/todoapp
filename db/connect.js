const mongoose = require("mongoose");

//MONGODB_URI =
//"mongodb+srv://new_user1:new_user1@cluster0.y5pchu2.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = (uri) => {
  console.log("DB Connected");
  return mongoose.connect(uri);
};

module.exports = connectDB;
