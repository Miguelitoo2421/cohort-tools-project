const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model.js");


// Crear student
router.post("/students", async (req, res) => {
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
    next(error);
  }
});

// encontrar todos
router.get("/students", async (req, res) => {
  try {
    const response = await Student.find().populate("cohort");

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//mostrar students por cohort
router.get("/students/cohort/:cohortId", async (req, res) => {
  try {
    const response = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// Encontrar student especifico
router.get("/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.send(response);
  } catch (error) {
    next(error);
  }
});

//actualizar info de student
router.put("/students/:studentId", async (req, res) => {
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
    next(error);
  }
});

//borrar student
router.delete("/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.studentId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router