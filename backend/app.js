require("rootpath")();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { errorHandler } = require("./_middleware");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// api routes
app.use("/users", require("users/user.controller"));

// error handler
app.use(errorHandler);

module.exports = app;
