const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoapp");

const taskSchema = mongoose.Schema({
  taskdata: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("task", taskSchema);
