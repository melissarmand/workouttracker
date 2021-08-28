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

request.onupgradeneeded = function (e) {
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
}