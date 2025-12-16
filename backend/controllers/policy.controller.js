const LeavePolicy = require("../models/LeavePolicy");

exports.createPolicy = async (req, res) => {
  const policy = await LeavePolicy.create(req.body);
  res.json(policy);
};

exports.getPolicies = async (req, res) => {
  const policies = await LeavePolicy.find();
  res.json(policies);
};

