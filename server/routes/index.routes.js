const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>{
  res.status(200).json({message: "all good here!"})
})


const studentRouter = require ("./student.routes.js")
router.use("/api/", studentRouter)
const cohortRouter = require ("./cohort.routes.js")
router.use("/api/", cohortRouter)

module.exports = router


