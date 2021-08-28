let db;
let workoutVersion;

const request = indexedDB.open('WorkoutDB', workoutVersion || 21);

request.onupgradeneeded = function (e) {
    console.log('Upgrade needed in IndexDB');

    const { oldVersion } = e;
    const newVersion = e.newVersion || db.newVersion;

    console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);

    db = e.targer.result;

    if (db.objectWorkoutNames.length === 0) {
        db.createWorkout('Workout', { autoIncrement: true});
    }
};

request.onerror = function (e) {
    console.log(`Woops! ${e.target.errorCode}`);
};

function checkDatabase() {
    console.log('check db invoked');

    let workout = db.workout(['Workout'], 'readWrite');
}