const express = require("express");
const mongoose = require("mongoose");
const WorkoutController = require('./controllers/workoutcontroller');
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const controller = new WorkoutController(app);
controller.createRoutes();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
