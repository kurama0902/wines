const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
// const logger = require("morgan");

const cors = require('cors');
const corsDefault = require('./corsSettings');

const path = require("path");
const app = express();

app.use(cors(corsDefault));

const api = require("./routes/api");
const users = require("./routes/users");
const index = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// fetch('/api/feedback')

// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 10 }));

app.use("/", index);
app.use("/api", api);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
