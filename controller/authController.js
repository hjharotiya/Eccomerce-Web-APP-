import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModal from "../model/userModal.js";
import JWT from "jsonwebtoken";

// REGISTER CONTROLLER

export const registerController = async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  // validation
  if (!name) {
    return res.send({ message: "Name is required" });
  }
  if (!email) {
    return res.send({ message: "Email is required" });
  }
  if (!phone) {
    return res.send({ message: "Phone is required" });
  }
  if (!password) {
    return res.send({ message: "Password is required" });
  }
  if (!address) {
    return res.send({ message: "Address is required" });
  }

  // check User
  const exisitingUser = await userModal.findOne({ email });
  // exiting User
  if (exisitingUser) {
    return res.status(200).send({
      success: false,
      message: "User Already register please Login",
    });
  }

  // register user
  const hasedPassword = await hashPassword(password);
  // save()

  const user = await new userModal({
    name,
    email,
    phone,
    address,
    password: hasedPassword,
  }).save();

  res.status(201).send({
    success: true,
    message: "user register Successfully",
    user,
  });
};

// LOGIN CONTROLLER

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check user
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid user",
      });
    }
    // password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// testController

export const testController = (req, res) => {
  try {
    res.send("protected routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
