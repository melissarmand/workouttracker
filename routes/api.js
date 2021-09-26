const router = require("express").Router();
const Workout = require("../models/workout.js");



router.get ("/api/workouts", (req, res) => {
    Workout.find()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    });
});



router.post("/api/workouts", (req, res) => {
    Workout.create({})
    .then(data => 
        res.json(data))
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, 
        push({exercises: req.body}))
        .then(data => 
            res.json(data))
            .catch(err => {
                res.status(400).json(err);
            });

});


module.exports = router;