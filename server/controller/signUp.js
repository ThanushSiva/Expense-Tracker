const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw Error("All fields are required")
    }

    const exists = await User.findOne({ email });

    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const response = await User.create({
      uuid: crypto.randomUUID(),
      name,
      email,
      password: hash,
    });

    const token = jwt.sign({ uuid: response.uuid, email: response.email }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      expire: "1d",
      httpOnly: true,
      sameSite: "Lax",
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
