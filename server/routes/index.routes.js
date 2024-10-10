const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>{
  res.status(200).json({message: "all good here!"})
})


const studentRouter = require ("./student.routes")
router.use("/students", studentRouter)
const cohortRouter = require ("./cohort.routes")
router.use("/cohorts", cohortRouter)

module.exports = router

//CRUD 

