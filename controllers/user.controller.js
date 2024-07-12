const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const harshedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({
        name,
        email,
        password: harshedPassword,
      });
      res.status(201).json(user);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: "User already exists" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    req.session.authenticated = true;
    req.session.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
