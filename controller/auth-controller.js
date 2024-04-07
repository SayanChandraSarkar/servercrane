const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

/*Register*/

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        message: `User with email  or username already exists`,
      });
    }

    //hash the password
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      password: hash_password,
    });

    res.status(201).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).send({ message: "page not found" });
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body);

    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    // console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }

    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne({ email }, { password: hashedPassword });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the password" });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user root ${error}`);
  }
};
module.exports = { register, login, updatePassword, user };
