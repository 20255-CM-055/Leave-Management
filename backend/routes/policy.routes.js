const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const {
  createPolicy,
  getPolicies
} = require("../controllers/policy.controller");

router.post("/", auth, role("Admin"), createPolicy);
router.get("/", auth, getPolicies);

module.exports = router;
