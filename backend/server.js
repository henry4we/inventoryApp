const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("../backend/routes/userRoute");
const productRoute = require("../backend/routes/productRoute");
const contactRoute = require("../backend/routes/contactRoute")
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require('cookie-parser')
const path = require("path")

const app = express();
app.use(errorHandler)

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cors());


app.use("uploads",express.static(path.join(__dirname,"uploads")))

//routes middleware

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);




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



