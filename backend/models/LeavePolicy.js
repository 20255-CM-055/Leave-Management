const mongoose = require("mongoose");

const leavePolicySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    maxLeaves: { type: Number, required: true },
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeavePolicy", leavePolicySchema);
