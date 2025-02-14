const express = require("express");
const router = express.Router();
const { selectPlan } = require("../Controllers/PlanController");
const { getPricing } = require("../Controllers/PlanController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
router.get("/pricing", userVerification, getPricing);

router.post("/select-plan", selectPlan);

module.exports = router;
