const path = require("path");
const WorkoutModel = require("../model/workoutmodel");
const { duration } = require("moment");
const { request } = require("http");
const { response } = require("express");

class WorkoutController {

    constructor(app) {
        this.app = app;
    }

    async saveWorkout(request, response) {

        let exerciseType = request.body.type;

        let exercise = {
            exercisetype: exerciseType,
            name: request.body.name,
            duration: request.body.duration
        };

        if (exerciseType == 'cardio') {
            exercise.distance = request.body.distance;
        } else {
            exercise.reps = request.body.reps;
            exercise.sets = request.body.sets;
            exercise.weight = request.body.weight;
        }

        let workout = await this.saveExcercise(exercise, request.params.id);
        response.json(workout);
    }

    async saveExcercise(exercise, workoutId) {

        let workout = null;

        if (workoutId)
            workout = await WorkoutModel.findOne({ _id: workoutId });

        if (workout == null)
            workout = new WorkoutModel();

        workout.exercises.push(exercise);
        await workout.save();

        return workout;
    }

    async getWorkouts(request, response) {
        let workouts = await WorkoutModel.find().lean();

        for (let workout of workouts) {
            let totalDuration = workout.exercises.reduce((total, currentValue) => total + currentValue.duration, 0);
            workout.totalDuration = totalDuration;
        }

        response.json(workouts);
    }

    showExcersisePage(request, response) {
        response.sendfile(path.join(__dirname, "../public/exercise.html"));
    }

    showIndexPage(request, response) {
        response.sendfile(path.join(__dirname, "../public/index.html"));
    }

    createNewWorkout(request, response) {
        let workout = new WorkoutModel();
        workout.save();
        response.json(workout);
    }

    showtStatsPage(request, response) {
        response.sendfile(path.join(__dirname, "../public/stats.html"));
    }

    async getWorkOutRange(request,response){
        let workouts = await WorkoutModel.find().lean();
        response.json(workouts);
    }

    createRoutes() {
        this.app.get("/", (request, response) => this.showIndexPage(request, response));
        this.app.get("/exercise", (request, response) => this.showExcersisePage(request, response));
        this.app.put("/api/workouts/:id", (request, response) => this.saveWorkout(request, response));
        this.app.get("/api/workouts", (request, response) => this.getWorkouts(request, response));
        this.app.post("/api/workouts", (request, response) => this.createNewWorkout(request, response));
        this.app.get("/stats", (request, response) => this.showtStatsPage(request, response));
        this.app.get("/api/workouts/range", (request, response) => this.getWorkOutRange(request, response));
    }
}

module.exports = WorkoutController;