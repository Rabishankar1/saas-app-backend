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


app.use(cookieParser()); 
app.use(express.json()); 

app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174", "https://saas-frontend-sigma.vercel.app"],
    credentials: true, 
  })
);

app.use("/", authRoute);
app.use("/api", planRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
