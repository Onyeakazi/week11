require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
