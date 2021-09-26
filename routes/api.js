const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get ("/api/workout", (req, res) => {
    Workout.find()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
});
// router.get("/api/workout", (req, res) => {
//     Workout.find({})
//     .sort({ date: -1 })
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });


router.post("/api/workout", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});


module.exports = router;