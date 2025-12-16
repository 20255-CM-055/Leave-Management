const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

(async () => {
  const admin = await User.findOne({ role: "Admin" });
  if (admin) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Admin",
    email: "admin@company.com",
    password: await bcrypt.hash("admin123", 10),
    role: "Admin"
  });

  console.log("Admin created");
  process.exit();
})();
