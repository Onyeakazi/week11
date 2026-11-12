const express = require("express");
const router = express.Router();
const {register, login, profile, adminDashboard} = require("../controllers/userController");
const {checkToken, authorize} = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", checkToken, profile);
router.get("/admin-dashboard", checkToken, authorize('admin'), adminDashboard);

module.exports = router;