const router = require("express").Router();
const Workout = require("../models/workout.js");


router.get ("/api/workouts", (req, res) => {
    Workout.find()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
});



router.post("/api/workout", (req, res) => {
    Workout.create(req.body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});


module.exports = router;