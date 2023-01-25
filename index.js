const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const parser = require("body-parser");
const authRouter = require("./src/auth/router");

const app = express();
app.use(cors());
app.use(parser.json());


mongoose.connect("mongodb://localhost:27017/blog");
mongoose.connection.on("connected", ()=>{
    console.log("DB Connected");
})

app.use("/auth",authRouter);

app.listen(4000, ()=>{
    console.log("Server started on 4000");
})