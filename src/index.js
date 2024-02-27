import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.get("/", (req, res) => {
    console.log("hellowrodl")
    res.send("Hello World");
});

app.listen(process.env.POST, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});