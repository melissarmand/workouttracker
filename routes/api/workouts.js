const router = require("express").Router();
const Workout = require("../../models/Workout.js");
const { Mongoose } = require("mongoose");
const db = require('../../models');




router.get ("/workouts", (req, res) => {
    db.Workout.find()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    });
});

router.get('/range', async (req, res) => {
	try {
		const workouts = await db.Workout.find({});
		res.json(workouts);
	} catch (err) {
		res.status(500).send(err);
	}
});



router.post("/workouts", (req, res) => {
    const workout = req.body;
    const result = db.Workout.create(workout);
    Workout.create({})
   .then(result => 
        res.json(result))
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, 
        push({exercises: req.body}))
        .then(data => 
            res.json(data))
            .catch(err => {
                res.status(400).json(err);
            });

});


module.exports = router;