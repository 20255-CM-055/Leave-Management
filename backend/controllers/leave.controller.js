const LeaveRequest = require("../models/LeaveRequest");
const User = require("../models/User");
const LeavePolicy = require("../models/LeavePolicy");

exports.applyLeave = async (req, res) => {
  const leave = await LeaveRequest.create({
    user: req.user.id,
    ...req.body
  });
  res.status(201).json(leave);
};


exports.getMyLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find({ user: req.user.id })
    .populate("policy");
  res.json(leaves);
};


exports.getEmployeeLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find()
    .populate("user")
    .populate("policy");

  const employeeLeaves = leaves.filter(
    l => l.user.role === "Employee"
  );

  res.json(employeeLeaves);
};


exports.getAllLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find()
    .populate("user")
    .populate("policy");
  res.json(leaves);
};


exports.approveLeave = async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id)
    .populate("user")
    .populate("policy");

  if (!leave) {
    return res.status(404).json({ message: "Leave not found" });
  }

  leave.status = "Approved";
  leave.approvedBy = req.user.id;


  if (req.user.role === "Admin") {
    const days =
      (new Date(leave.toDate) - new Date(leave.fromDate)) /
        (1000 * 60 * 60 * 24) +
      1;

    const policyName = leave.policy.name;

    const currentBalance =
      leave.user.leaveBalance.get(policyName) ??
      leave.policy.maxLeaves;

    leave.user.leaveBalance.set(
      policyName,
      currentBalance - days
    );

    await leave.user.save();
  }

  await leave.save();
  res.json(leave);
};


exports.rejectLeave = async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);

  leave.status = "Rejected";
  leave.remarks = req.body.remarks;
  leave.approvedBy = req.user.id;

  await leave.save();
  res.json(leave);
};
