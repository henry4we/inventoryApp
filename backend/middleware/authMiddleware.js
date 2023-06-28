const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");




const protect = asyncHandler(async(req,res, next)=>{
     try {
        //lets check if the request from front end ha a cookie/tiken

       const token =  req.cookies.token
        if(!token){
            res.status(404)
            throw new Error("Not authorized please login")
        }
           // verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //get the user id from the token
        const user = await User.findById(verified.id).select("-password")

        //now we check  if the user is not authorized
        if(!user){
            res.status(401)
            throw new Error("user not found")
        }
        //when the user is authorized we save it in a variable "req.user"
        req.user = user;
        next();
        
     } catch (error) {
        res.status(401)
        throw new Error("You are not authorized to access this resource. Please log in to continue.")
        
     }
})

module.exports = protect;