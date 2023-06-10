const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
  //destructure the name , email and password
  const { name, email, password } = req.body;

  //validation for name , email and password
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  //validtion for password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("password must be at least 6 characters");
  }
  // check if userExist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  //create a new user

  const user = await User.create({
    name,
    email,
    password,
  });

  //   Generate Token using the varibale name user
  const token = generateToken(user._id);

  // after generating token we Send HTTP-only cookie to the frontend
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // expires in i day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validation for email and password

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter your email address and password");
  }
    //check if user exists
    const doesUserExist = await User.findOne({ email });
    if (!doesUserExist) {
      res.status(400);
      throw new Error("User not found. Please sign up to create an account");
    }
    //check if  password is correct
    const isPasswordValid = await bcrypt.compare(password, doesUserExist.password);

      //   Generate Token
  const token = generateToken(doesUserExist._id);

  if(isPasswordValid){
     //Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }

    if (doesUserExist && isPasswordValid) {
      const { _id, name, email, photo, phone, bio } = doesUserExist;
      res.status(200).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password. Please check your credentials and try again");
    }
  
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({message:"logout Successfully"})

});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};


