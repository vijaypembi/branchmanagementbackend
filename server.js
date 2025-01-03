const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const branchRoutes = require("./routs/branchRoutes");

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// http://localhost:5000/api/branches
// http://localhost:5000/api/branches/:id
//http://localhost:5000/api/branches/searchBranch?branchName=chennai

// Listening to the server PORT
app.use("/api/branches", branchRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connecting to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });
