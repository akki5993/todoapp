const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoapp");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
