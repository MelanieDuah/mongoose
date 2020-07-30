const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: { type: Date, default: Date.now },
    exercises: [{
        exercisetype: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance : Number
    }]
});

let workoutModel = mongoose.model('workout', workoutSchema);
module.exports = workoutModel;