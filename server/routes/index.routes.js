const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" });
});

const authRouter = require("./auth.routes.js");
router.use("/auth/", authRouter);

const studentRouter = require("./student.routes.js");
router.use("/students", studentRouter);
const cohortRouter = require("./cohort.routes.js");
router.use("/cohorts", cohortRouter);
const userRouter = require("./users.routes.js");
router.use("/users", userRouter);
module.exports = router;
