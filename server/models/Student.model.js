
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  phone:  {type: String, unique: true, minlength:12},
  linkedinUrl: {type: String, unique: true},
  languages: {type: String, enum:["French", "Spanish", "English", "Dutch", "German", "Portuguese", "Italian", "Bulgarian", "Korean", "Chinese"]},
  program: {type: String, enum:["Data Analytics", "UX/UI", "Web Dev", "Cybersecurity"]},
  background: String,
  image: String,
  projects:[String],
  cohort: {type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort"
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
