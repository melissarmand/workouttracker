const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: ""
    },

    date: {
        type: Date,
        default: Date.now
    }
})