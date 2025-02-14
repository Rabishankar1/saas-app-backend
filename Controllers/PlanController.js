const User = require("../Models/UserModel");
const Prices = require("../Models/PriceModal");
module.exports.selectPlan = async (req, res, next) => {
  try {
    const { plan, userId } = req.body;

    if (!userId || !plan) {
      return res.status(400).json({ message: "Missing userId or plan" });
    }
    console.log("Selected plan:", plan);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { subscriptionPlan: plan },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Selected plan saved for user:", updatedUser);
    res.status(200).json({
      message: "Plan saved successfully",
      user: updatedUser,
    });
    next();
  } catch (error) {
    console.error("Error saving selected plan:", error);
    res.status(500).json({ message: "Error saving plan" });
  }
};

module.exports.getPricing = async (req, res, next) => {
  try {
    const allPrices = await Prices.find();
    console.log("All prices:", allPrices);
    if (!allPrices) {
      return res.status(400).json({ message: "No prices found" });
    }
    res.status(200).json(allPrices);

    next();
  } catch (error) {
    console.error("Error saving selected plan:", error);
    res.status(500).json({ message: "Error saving plan" });
  }
};
