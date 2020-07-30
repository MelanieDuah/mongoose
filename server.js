const express = require("express");
const mongoose = require("mongoose");
const WorkoutController = require('./controllers/workoutcontroller');
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

connectMongoose();


const controller = new WorkoutController(app);
controller.createRoutes();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

async function connectMongoose(){
  try{

    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/workoutdb", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  }catch(error){
     console.error("still can't connect to mongoose");
  }
}
