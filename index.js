require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const tagRoutes = require("./router/tag.route");
const userRoute = require("./router/user.route");
const taskRoute = require("./router/task.route");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(3001, () => {
      console.log("Running on port 3001");
    });
  })
  .catch((err) => console.log(err));

//middlewares
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URI,
    }),
    cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoute);
app.use("/api/tags", tagRoutes);
app.use("/api/tasks", taskRoute);
