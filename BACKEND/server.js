const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
//reading url in .env file
require("dotenv").config();

//Define port
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Connect database

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//open created database connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb Connection success");
});
//access to supplier.js
// const supplierRouter = require("./routes/supplier.js");
// app.use("/supplier",supplierRouter);

const userRouter = require("./routes/user.js");
app.use("/user", userRouter);

const staffRouter = require("./routes/staff");
app.use("/staff", staffRouter);

const roomRouter = require("./routes/Rooms.js");
app.use("/rooms", roomRouter);

const bookingRouter = require("./routes/booking.js");
app.use("/booking", bookingRouter);

const acceptBookingRouter = require("./routes/acceptedBooking");
app.use("/booking",acceptBookingRouter);

const declinedBookingRouter = require("./routes/declinedBooking");
app.use("/booking",declinedBookingRouter);

const attandenceRouter = require("./routes/attandence");
app.use("/staff", attandenceRouter);

//running port 8970
app.listen(PORT, () => {
  console.log(`Server is up and running on port no: ${PORT}`);
});
