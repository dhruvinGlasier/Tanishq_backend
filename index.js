const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/images', express.static('public/images'));

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

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
