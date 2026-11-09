const User = require('../models/User');

// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    // 2. Create User (password is hashed automatically by our Mongoose hook!)
    const user = await User.create({ email, password });
    
    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Provide email and password" });
    }

    // 2. Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid Credentials" });
    }

    // 3. Check if password matches using our custom Schema method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid Credentials" });
    }

    // 4. Success! (Tomorrow we will return a JWT Token here)
    res.status(200).json({ success: true, message: "Logged in successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};