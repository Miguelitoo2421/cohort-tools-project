require('dotenv').config()

const cohorts = require("./cohorts.json")
const students = require("./students.json")

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const port = process.env.PORT

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
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

app.get("/api/cohorts", (req, res)=>{
  res.json(cohorts)
})

app.get("/api/students", (req, res)=>{
  res.json(students)
})

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});