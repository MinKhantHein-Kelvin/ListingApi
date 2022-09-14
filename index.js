const express = require("express");
const app = express();
const PORT =  4000;
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//connect to Database
mongoose.connect(
  process.env.db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB is connected");
  }
);

// import route
const listingRouters = require("./routes/listing");
const userRouters = require ("./routes/user")

//Middleware
app.use(express.json());
app.use(cors());

//Route Middleware
app.use("/api/listing", listingRouters);
app.use("/api/user", userRouters);


app.listen(PORT, () => {
  console.log("Server is running on Port at 4000");
});

