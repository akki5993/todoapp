const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("task", taskSchema);
