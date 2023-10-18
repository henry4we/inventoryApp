const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
//registerUser
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
//loginUser
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
  const isPasswordValid = await bcrypt.compare(
    password,
    doesUserExist.password
  );

  //   Generate Token
  const token = generateToken(doesUserExist._id);

  if (isPasswordValid) {
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
    throw new Error(
      "Invalid email or password. Please check your credentials and try again"
    );
  }
});
//logoutUser
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "logout Successfully" });
});

//getUser
const getUser = asyncHandler(async (req, res) => {
  //we find the user in the database using the id with the help of the variabel name for protect function
  const userInfo = await User.findById(req.user._id);

  //Now when user is found we retrieve the user
  if (userInfo) {
    const { _id, name, email, photo, phone, bio } = userInfo;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("No matching user");
  }
});

//loginStatus
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  const verified = await jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//UPDATEUSER status
const updateUser = asyncHandler(async (req, res) => {
  const updateuser = await User.findById(req.user._id);
  if (updateuser) {
    const { name, email, photo, phone, bio } = updateuser;

    updateuser.email = email;
    updateuser.name = req.body.name || name;
    updateuser.photo = req.body.photo || photo;
    updateuser.phone = req.body.phone || phone;
    updateuser.bio = req.body.bio || bio;

    //  save to database and return the updated user
    const updateduser = await updateuser.save();
    res.status(200).json({
      _id: updateduser._id,
      name: updateduser.name,
      email: updateduser.email,
      photo: updateduser.photo,
      phone: updateduser.phone,
      bio: updateduser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//CHANGE PASSWORD
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found please signup");
  }

  const { oldPassword, password } = req.body;
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("pleased add a old and new passwords");
  }

  const passwordIscorrect = await bcrypt.compare(oldPassword, user.password);

  if (user && passwordIscorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("password succesfully change");
  } else {
    res.status(400);
    throw new Error("old password incorrect");
  }
});

//FORGOT PASSWORD
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  // Delete token if it exists in the database
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // create Reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  //Hash token before saving to database
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //save token to database

  await new Token({
    userId: user._id,
    token: hashedToken,
    createAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  //construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  //Reset  Email
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>Kindly use the url below to reset your password</p>
    <p>The reset link is valid for 30 minutes.</p>
    <h1>The is a Test Mail</h1>
    

    
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>


    <p>Regards...</p>
    <p>Henry Stiles Company</p>
    
    `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//resetPassword
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  //hashed token  before we send to database
  const hashedToken = crypto
    .createHash("SHA256")
    .update(resetToken)
    .digest("hex");

  //find token in databse

  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  //find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password Reset Successfully Please Login" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
