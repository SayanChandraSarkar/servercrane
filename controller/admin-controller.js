const Admin = require("../models/admin-model");

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await Admin.findOne({ username });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }

    const isPasswordValid = password === userExist.password;

    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login successful",
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = adminLogin;
