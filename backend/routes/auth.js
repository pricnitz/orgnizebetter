const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    let user = await User.findOne({ email });

    // If user doesn’t exist, create one
    if (!user) {
      user = new User({ email, password });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
