const router = require("express").Router();
const Workout = require("../models/workout");



router.get ("/api/workouts", (req, res) => {
    Workout.find()
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