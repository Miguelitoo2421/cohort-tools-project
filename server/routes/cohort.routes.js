const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model.js");

//crear cohort
router.post("/", async (req, res, next) => {
  try {
    const response = await Cohort.create({
      ...req.body,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//mostrar todos los cohorts
router.get("/", async (req, res, next) => {
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//mostrar detalles de cohort concreto
router.get("/:cohortId", async (req, res, next) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//editar cohort
router.put("/:cohortId", async (req, res, next) => {
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
    next(error);
  }
});

//eliminar cohort
router.delete("/:cohortId", async (req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(201).json({ mesage: "Cohort eliminado" });
  } catch (error) {
    next(error);
  }
});

module.exports = router
