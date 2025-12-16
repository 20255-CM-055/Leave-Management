const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const {
  applyLeave,
  getMyLeaves,
  getEmployeeLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave
} = require("../controllers/leave.controller");


router.post("/", auth, role("Employee", "Manager"), applyLeave);

router.get("/my", auth, getMyLeaves);


router.get("/manager", auth, role("Manager"), getEmployeeLeaves);


router.get("/all", auth, role("Admin"), getAllLeaves);


router.patch("/:id/approve", auth, role("Manager", "Admin"), approveLeave);
router.patch("/:id/reject", auth, role("Manager", "Admin"), rejectLeave);

module.exports = router;
