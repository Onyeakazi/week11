require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port 3000");
})