require("dotenv").config();



const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose")

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const Cohort = require("./models/Cohort.model.js");
const Student = require("./models/Student.model.js");

const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  console.log(res)
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  // res.json(cohorts);
  Cohort.find({})
  .then((cohorts)=>{
    res.json(cohorts)
  })
});

app.get("/api/students", (req, res) => {
  // res.json(students);
  Student.find({})
  .then((students)=>{
    res.json(students)
  })

});

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
