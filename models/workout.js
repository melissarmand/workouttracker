const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    exercises: {
        type: String,
        trim: true,
        duration: Number,
        weight: Number, 
        reps: Number,
        sets: Number,
        required: "Please enter all requested information"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;