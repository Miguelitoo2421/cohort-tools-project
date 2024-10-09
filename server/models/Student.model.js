const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true, minlength: 12 },
  linkedinUrl: { type: String, default: "www.linkedin.com" },
  languages: [String],
  program: {
    type: String,
    enum: ["Data Analytics", "UX/UI", "Web Dev", "Cybersecurity"],
  },
  background: String,
  image: {
    type: String,
    default:
      "https://static.wikia.nocookie.net/joke-battles/images/d/df/Gigachad.png/revision/latest?cb=20230812064835",
  },
  projects: [String],
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
