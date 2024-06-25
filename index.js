const express = require("express");
// const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
app.use(express.json());
PORT = process.env.PORT;
app.use(cors());

const authRoute = require("../Tanishq/Tanishq/BackEnd/routes/authRoute");
const userRoute = require("../Tanishq/Tanishq/BackEnd/routes/userRoute");
const productRoute = require("../Tanishq/Tanishq/BackEnd/routes/productRoute");

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
