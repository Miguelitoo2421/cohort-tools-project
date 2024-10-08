
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  format: String,
  campus: String,
  starDate: String,
  endDate: String,
  programManager: String,
  leadTeacher: String,
  totalHours: Number
});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
