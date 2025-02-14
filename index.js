const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const authRoute = require("./Routes/AuthRoute");
const planRoute = require("./Routes/PlanRoute");
const userRoute = require("./Routes/UserRoute");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:5173", "https://tiered-pricing-page-production.up.railway.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

app.use("/api", planRoute);

app.use("/user", userRoute);
