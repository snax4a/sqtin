require("rootpath")();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { errorHandler } = require("_middleware");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// api routes
app.use("/accounts", require("accounts/account.controller"));
app.use("/customers", require("customers/customer.controller"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw "not found";
});

// error handler
app.use(errorHandler);

module.exports = app;
