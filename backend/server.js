const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("../backend/routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require('cookie-parser')

const app = express();
app.use(errorHandler)

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }));
app.use(bodyParser.json());

//routes middleware

app.use("/api/users", userRoute);





const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONG0_URI)
  .then(() => {
    console.log("server connection established");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server listening on   ${PORT}`);
});



