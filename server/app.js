require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

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
  res.sendFile(__dirname + "/views/docs.html");
});

// Crear student
app.post("/api/students", async (req, res) => {
  try {
    const response = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
      cohort: req.body.cohort,
    });
    res.send(response);

    console.log("operation succesful");
  } catch (error) {
    console.log(error);
  }
});
// encontrar todos
app.get("/api/students", async (req, res) => {
  try {
    const response = await Student.find().populate("cohort");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});
//mostrar students por cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const response = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});
// Encontrar student especifico
app.get("/api/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});
//actualizar info de student
app.put("/api/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        linkedinUrl: req.body.linkedinUrl,
        languages: req.body.languages,
        program: req.body.program,
        background: req.body.background,
        image: req.body.image,
        projects: req.body.projects,
        cohort: req.body.cohort,
      },
      { new: true }
    );
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
});
//borrar student
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.studentId);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
});

//crear cohort
app.post("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.create({
      ...req.body,
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

//mostrar todos los cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});
//mostrar detalles de cohort concreto
app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});
//editar cohort
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      {
        ...req.body,
      },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});
//eliminar cohort
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(201).json({ mesage: "Cohort eliminado" });
  } catch (error) {
    console.log(error);
  }
});

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
