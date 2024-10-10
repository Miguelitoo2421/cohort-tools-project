require("dotenv").config();

const express = require("express");

const port = process.env.PORT;


require("./db");
const app = express();
const configs = require ("./config");
configs(app);

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express





// MIDDLEWARE
// Research Team - Set up CORS middleware here:


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  console.log(res)
  res.sendFile(__dirname + "/views/docs.html");
});


const indexRouter = require("./routes/index.routes.js")
app.use("/", indexRouter)


const errorHandling = require("./error-handlers")
errorHandling(app)

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



