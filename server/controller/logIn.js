const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error("All fields are required");
    }

    const exists = await User.findOne({ email });

    if (!exists) {
      throw Error("User doesn't exists");
    }

    const match = await bcrypt.compare(password, exists.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    const token = jwt.sign(
      { uuid: exists.uuid, email: exists.email },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );

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
