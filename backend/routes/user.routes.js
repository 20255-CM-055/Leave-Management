const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const {
  getUsers,
  createUser,
  toggleUser
} = require("../controllers/user.controller");


router.get("/", auth, role("Admin"), getUsers);
router.post("/", auth, role("Admin"), createUser);
router.patch("/:id/toggle", auth, role("Admin"), toggleUser);

module.exports = router;
