exports.logOut = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "success" });
};
