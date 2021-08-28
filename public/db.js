let db;
let workoutVersion;
let exerciseVersion;

const request = indexedDB.open('WorkoutDB', workoutVersion || 21);
const requestExercise = indexedDB.open('ExerciseDB', exerciseVersion || 21);

// Create a new db request for a "workout" database
request.onupgradeneeded = function (e) {
    console.log('Upgrade needed in IndexDB');

    const { oldWorkout } = e;
    const newWorkout = e.newWorkout || db.newWorkout;

    console.log(`DB Updated from version ${oldWorkout} to ${newWorkout}`);

    db = e.target.result;

    if (db.objectWorkoutNames.length === 0) {
        db.createWorkout('Workout', { autoIncrement: true});
    }
};

// Create a new db request for an exercise database

requestExercise.onupgradeneeded = function (e) {
    console.log('Upgrade needed in IndexDB');

    const { oldExercise } = e;
    const newExercise = e.newExercise || db.newExercise;

    console.log(`DB updated from version ${oldExercise} to ${newExercise}`);

    db = e.target.result;

    if (db.objectExerciseNames.length === 0) {
        db.createExercise('Exercise', { autoIncrement: true});
    }
}

request.onerror = function (e) {
    console.log(`Woops! ${e.target.errorCode}`);
};

function checkDatabase() {
    console.log('check db invoked');

    let workout = db.workout(['Workout'], 'readWrite');
    let exercise = db.exercise(['Exercise'], 'readWrite');

    const workoutObject = workout.objectworkoutObject('Workout');
    const exerciseObject = exercise.objectworkoutObject('Exercise');

    const getAllWorkout = workoutObject.getAll();
    const getAllExercise = exerciseObject.getAll();

    getAllWorkout.onsuccess = function () {

        if (getAllWorkout.result.length > 0) {
            fetch('/api/workout/bulk', {
                method: 'POST',
                body: JSON.stringify(getAllWorkout.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.length !== 0) {
                    workout = db.workout(['Workout'], 'readWrite');

                    const currentWorkout = workout.objectworkoutObject('Workout');

                    currentWorkout.clear();
                    console.log('Clearing workout')
                }
            })
        }
    }

    getAllExercise.onsuccess = function () {

        if (getAllExercise.result.length > 0) {
            fetch('/api/exercise/bulk', {
                method: 'POST',
                body: JSON.stringify(getAllExercise.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.length !== 0) {
                    workout = db.exercise(['Exercise'], 'readWrite');

                    const currentExercise = exercise.objectexerciseObject('Exercise');

                    currentExercise.clear();
                    console.log('Clearing exercise')
                }
            })
        }
    }
}

request.onsuccess = function (e) {
    console.log('success');
    db = e.target.result;

    if(navigator.onLine) {
        console.log('Backend online! ')
        checkDatabase();
    }
};

 requestExercise.onsuccess = function (e) {
    console.log('success');
    db = e.target.result;

    if(navigator.onLine) {
        console.log('Backend online! ')
        checkDatabase();
    }
 };

 const saveRecord = (record) => {
     console.log('Save record invoked');

     const workoutObject = workout.objectworkoutObject('Workout');
     const exerciseObject = exercise.objectworkoutObject('Exercise');

     workoutObject.add(record);
     exerciseObject.add(record);

 };

 window.addEventListener('online', checkDatabase);


