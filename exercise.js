// =====================================
// CHAMPION HABIT TRACKER
// EXERCISE.JS
// FINAL WORKOUT FLOW + PROGRESS FIX
// =====================================


// =====================================
// GET URL PARAMETERS
// =====================================

const urlParams = new URLSearchParams(
    window.location.search
);

const exerciseName =
    urlParams.get("exercise");

const goal =
    urlParams.get("goal") || "fatLoss";

const day =
    urlParams.get("day") || "";


// =====================================
// GET CURRENT USER
// =====================================

function getCurrentUser() {

    return (
        localStorage.getItem("user") ||
        "Guest"
    );

}


// =====================================
// TODAY KEY
// =====================================

function getTodayKey() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const date =
        String(
            today.getDate()
        ).padStart(2, "0");

    return `${year}_${month}_${date}`;

}


// =====================================
// WORKOUT STORAGE KEY
// PROFILE + DATE SPECIFIC
// =====================================

function getWorkoutStorageKey() {

    const user =
        getCurrentUser();

    const date =
        getTodayKey();

    return `${user}_workout_${date}`;

}


// =====================================
// EXERCISE DATABASE
// =====================================

const exerciseData = {

    // =================================
    // CHEST
    // =================================

    "Chest Press": {

        target:
            "Chest, Shoulders & Triceps",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "60–90 seconds",

        instructions:
            "Sit comfortably on the chest press machine. Keep your back against the pad. Push the handles forward without locking your elbows. Slowly return to the starting position.",

        formTips:
            "Keep your chest up, shoulders relaxed and controlled throughout the movement. Do not use momentum."

    },


    "Bench Press": {

        target:
            "Chest, Shoulders & Triceps",

        sets:
            "3 Sets × 8–12 Reps",

        rest:
            "90 seconds",

        instructions:
            "Lie flat on the bench. Keep your feet firmly on the floor. Lower the bar toward the middle of your chest and press it upward under control.",

        formTips:
            "Keep your shoulder blades retracted. Keep wrists straight and avoid bouncing the bar off your chest."

    },


    "Incline Dumbbell Press": {

        target:
            "Upper Chest & Shoulders",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "60–90 seconds",

        instructions:
            "Set the bench at a moderate incline. Hold the dumbbells near your chest. Press them upward and slightly inward, then slowly lower them.",

        formTips:
            "Keep your shoulders stable and avoid excessively arching your lower back."

    },


    "Chest Fly": {

        target:
            "Chest",

        sets:
            "3 Sets × 12–15 Reps",

        rest:
            "60 seconds",

        instructions:
            "Sit or lie on the fly machine/bench. Bring your arms together in front of your chest while maintaining a slight bend in your elbows.",

        formTips:
            "Use controlled movement. Do not stretch excessively or use heavy momentum."

    },


    // =================================
    // SHOULDERS
    // =================================

    "Shoulder Press": {

        target:
            "Shoulders & Triceps",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "60–90 seconds",

        instructions:
            "Sit with your back supported. Start with the weights near shoulder level. Press upward until your arms are almost straight, then lower slowly.",

        formTips:
            "Keep your core tight. Do not overextend your lower back."

    },


    "Lateral Raise": {

        target:
            "Side Shoulders",

        sets:
            "3 Sets × 12–15 Reps",

        rest:
            "45–60 seconds",

        instructions:
            "Stand tall holding dumbbells beside your body. Raise your arms sideways until approximately shoulder height, then lower slowly.",

        formTips:
            "Use light weights and controlled movement. Avoid swinging the dumbbells."

    },


    // =================================
    // TRICEPS
    // =================================

    "Triceps Pushdown": {

        target:
            "Triceps",

        sets:
            "3 Sets × 10–15 Reps",

        rest:
            "60 seconds",

        instructions:
            "Stand facing the cable machine. Keep your elbows close to your body and push the handle downward until your arms are extended.",

        formTips:
            "Keep your elbows fixed. Move only your forearms and avoid leaning excessively."

    },


    "Triceps Extension": {

        target:
            "Triceps",

        sets:
            "3 Sets × 10–15 Reps",

        rest:
            "60 seconds",

        instructions:
            "Hold the weight securely and bend your elbows to lower the weight. Extend your arms back to the starting position.",

        formTips:
            "Keep elbows pointing forward and use controlled movement."

    },


    // =================================
    // BACK
    // =================================

    "Lat Pulldown": {

        target:
            "Latissimus Dorsi, Upper Back & Biceps",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "60–90 seconds",

        instructions:
            "Sit at the lat pulldown machine and grip the bar slightly wider than shoulder width. Pull the bar toward your upper chest and slowly return it upward.",

        formTips:
            "Keep your chest lifted and pull using your elbows. Avoid swinging your body."

    },


    "Seated Row": {

        target:
            "Middle Back & Biceps",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "60–90 seconds",

        instructions:
            "Sit upright and hold the cable handle. Pull the handle toward your lower chest or abdomen while squeezing your shoulder blades.",

        formTips:
            "Keep your back neutral. Do not round your shoulders or use momentum."

    },


    "Seated Cable Row": {

        target:
            "Middle Back & Biceps",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "60–90 seconds",

        instructions:
            "Sit upright with your feet supported. Pull the cable toward your abdomen and slowly extend your arms again.",

        formTips:
            "Keep the spine neutral and squeeze your shoulder blades at the end of the movement."

    },


    "Dumbbell Row": {

        target:
            "Lats, Upper Back & Biceps",

        sets:
            "3 Sets × 10–12 Reps each side",

        rest:
            "60–90 seconds",

        instructions:
            "Place one hand and knee on a bench. Hold the dumbbell with the opposite hand. Pull it toward your hip and lower it slowly.",

        formTips:
            "Keep your back flat and avoid rotating your torso."

    },


    // =================================
    // BICEPS
    // =================================

    "Biceps Curl": {

        target:
            "Biceps",

        sets:
            "3 Sets × 10–15 Reps",

        rest:
            "60 seconds",

        instructions:
            "Stand tall holding dumbbells with your palms facing forward. Curl the weights toward your shoulders and slowly lower them.",

        formTips:
            "Keep your elbows close to your body. Do not swing your arms."

    },


    // =================================
    // LEGS
    // =================================

    "Squats": {

        target:
            "Quadriceps, Glutes & Hamstrings",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "90 seconds",

        instructions:
            "Stand with feet approximately shoulder width apart. Push your hips back and bend your knees. Lower yourself comfortably and drive through your feet to stand.",

        formTips:
            "Keep your chest up and knees tracking in line with your toes. Use a comfortable depth."

    },


    "Leg Press": {

        target:
            "Quadriceps, Glutes & Hamstrings",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "90 seconds",

        instructions:
            "Sit securely on the leg press machine. Place your feet shoulder width apart. Lower the platform under control and press it back upward.",

        formTips:
            "Do not lock your knees. Keep your lower back against the pad."

    },


    "Leg Extension": {

        target:
            "Quadriceps",

        sets:
            "3 Sets × 12–15 Reps",

        rest:
            "60 seconds",

        instructions:
            "Sit on the machine with your knees aligned with the machine pivot. Extend your legs upward and slowly lower them.",

        formTips:
            "Use controlled movement and avoid kicking the weight."

    },


    "Calf Raise": {

        target:
            "Calves",

        sets:
            "3 Sets × 12–20 Reps",

        rest:
            "45–60 seconds",

        instructions:
            "Stand securely and raise your heels as high as comfortable. Pause briefly at the top and lower slowly.",

        formTips:
            "Use a full comfortable range of motion and avoid bouncing."

    },


    // =================================
    // GLUTES & HAMSTRINGS
    // =================================

    "Hip Thrust": {

        target:
            "Glutes & Hamstrings",

        sets:
            "3 Sets × 10–12 Reps",

        rest:
            "90 seconds",

        instructions:
            "Position your upper back on a bench and feet firmly on the floor. Drive your hips upward and squeeze your glutes at the top.",

        formTips:
            "Keep your ribs controlled and avoid excessive lower-back arching."

    },


    "Leg Curl": {

        target:
            "Hamstrings",

        sets:
            "3 Sets × 10–15 Reps",

        rest:
            "60 seconds",

        instructions:
            "Position yourself correctly on the leg curl machine. Curl your heels toward your glutes and slowly return to the starting position.",

        formTips:
            "Keep your hips stable and avoid lifting them from the pad."

    },


    "Lunges": {

        target:
            "Glutes, Quadriceps & Hamstrings",

        sets:
            "3 Sets × 10 Reps each leg",

        rest:
            "60–90 seconds",

        instructions:
            "Stand tall and step forward. Lower your body until both knees bend comfortably, then push through the front foot to return.",

        formTips:
            "Keep your front knee aligned with your foot and maintain balance."

    },


    "Glute Kickback": {

        target:
            "Glutes",

        sets:
            "3 Sets × 12–15 Reps each leg",

        rest:
            "45–60 seconds",

        instructions:
            "Using a cable or machine, move one leg backward while keeping your torso stable. Return slowly.",

        formTips:
            "Do not swing the leg. Focus on squeezing the glute."

    },


    "Romanian Deadlift": {

        target:
            "Hamstrings, Glutes & Lower Back",

        sets:
            "3 Sets × 8–12 Reps",

        rest:
            "90 seconds",

        instructions:
            "Hold the weights close to your body. Push your hips backward while keeping a slight knee bend. Lower until you feel a comfortable hamstring stretch, then drive your hips forward.",

        formTips:
            "Keep your back neutral and keep the weights close to your legs."

    },


    // =================================
    // CORE
    // =================================

    "Crunches": {

        target:
            "Abdominals",

        sets:
            "3 Sets × 15–20 Reps",

        rest:
            "45 seconds",

        instructions:
            "Lie on your back with knees bent. Brace your core and lift your shoulders slightly from the floor before lowering slowly.",

        formTips:
            "Do not pull your neck. Keep the movement controlled."

    },


    "Plank": {

        target:
            "Core",

        sets:
            "3 Sets × 30–60 seconds",

        rest:
            "45–60 seconds",

        instructions:
            "Place your forearms on the floor and extend your legs behind you. Keep your body in a straight line and brace your core.",

        formTips:
            "Do not let your hips drop or rise excessively. Breathe normally."

    },


    "Mountain Climbers": {

        target:
            "Core, Shoulders & Cardio",

        sets:
            "3 Sets × 30–45 seconds",

        rest:
            "45 seconds",

        instructions:
            "Start in a high plank position. Drive one knee toward your chest and alternate legs at a controlled pace.",

        formTips:
            "Keep your hips stable and maintain a strong plank position."

    },


    // =================================
    // CARDIO
    // =================================

    "Incline Walking": {

        target:
            "Cardio & Lower Body",

        sets:
            "15–20 minutes",

        rest:
            "As needed",

        instructions:
            "Walk on a treadmill using a comfortable incline and moderate pace. Maintain a pace that allows controlled breathing.",

        formTips:
            "Avoid holding the treadmill handles unless necessary for safety."

    },


    "Walking": {

        target:
            "Cardio & Daily Activity",

        sets:
            "20–30 minutes",

        rest:
            "As needed",

        instructions:
            "Walk at a comfortable to moderately brisk pace. Maintain good posture and consistent movement.",

        formTips:
            "Keep your shoulders relaxed and maintain a natural walking stride."

    },


    // =================================
    // RECOVERY
    // =================================

    "Full Body Stretching": {

        target:
            "Full Body Mobility",

        sets:
            "10–15 minutes",

        rest:
            "Relax between stretches",

        instructions:
            "Perform gentle stretches for the major muscle groups. Hold each comfortable stretch without bouncing.",

        formTips:
            "Never force a stretch into pain. Breathe slowly throughout."

    },


    "Stretching": {

        target:
            "Full Body Mobility",

        sets:
            "10–15 minutes",

        rest:
            "Relax between stretches",

        instructions:
            "Perform gentle stretches for the major muscle groups and hold each position comfortably.",

        formTips:
            "Avoid bouncing and stop if you feel sharp pain."

    },


    "Mobility": {

        target:
            "Joint Mobility & Movement",

        sets:
            "10–15 minutes",

        rest:
            "As needed",

        instructions:
            "Perform controlled mobility movements for shoulders, hips, ankles and spine.",

        formTips:
            "Use slow controlled movements and stay within a comfortable range."

    },


    "Light Walking": {

        target:
            "Recovery & Active Rest",

        sets:
            "15–30 minutes",

        rest:
            "As needed",

        instructions:
            "Take an easy walk at a comfortable pace to support active recovery.",

        formTips:
            "Keep the pace easy and focus on relaxed movement."

    },


    // =================================
    // FULL BODY
    // =================================

    "Push-ups": {

        target:
            "Chest, Shoulders & Triceps",

        sets:
            "3 Sets × 8–15 Reps",

        rest:
            "60–90 seconds",

        instructions:
            "Start in a plank position with hands slightly wider than shoulder width. Lower your chest toward the floor and push back up.",

        formTips:
            "Keep your body straight and elbows controlled. Use an easier variation if necessary."

    }

};


// =====================================
// FIND EXERCISE
// =====================================

function findExercise() {

    if (!exerciseName) {
        return null;
    }

    return (
        exerciseData[exerciseName] ||
        null
    );

}


// =====================================
// GET ELEMENT HELPER
// =====================================

function getElementByPossibleIds(ids) {

    for (
        let i = 0;
        i < ids.length;
        i++
    ) {

        const element =
            document.getElementById(
                ids[i]
            );

        if (element) {
            return element;
        }

    }

    return null;

}


// =====================================
// WORKOUT PLAN
// =====================================

const workoutPlans = {

    fatLoss: {

        Monday: [
            "Chest Press",
            "Shoulder Press",
            "Lateral Raise",
            "Triceps Pushdown"
        ],

        Tuesday: [
            "Lat Pulldown",
            "Seated Row",
            "Dumbbell Row",
            "Biceps Curl"
        ],

        Wednesday: [
            "Squats",
            "Leg Press",
            "Leg Extension",
            "Calf Raise"
        ],

        Thursday: [
            "Hip Thrust",
            "Leg Curl",
            "Lunges",
            "Glute Kickback"
        ],

        Friday: [
            "Crunches",
            "Plank",
            "Mountain Climbers",
            "Incline Walking"
        ],

        Saturday: [
            "Squats",
            "Push-ups",
            "Lat Pulldown",
            "Walking"
        ],

        Sunday: [
            "Full Body Stretching",
            "Mobility",
            "Light Walking"
        ]

    },


    muscleGain: {

        Monday: [
            "Bench Press",
            "Incline Dumbbell Press",
            "Chest Fly",
            "Triceps Pushdown"
        ],

        Tuesday: [
            "Lat Pulldown",
            "Seated Cable Row",
            "Dumbbell Row",
            "Biceps Curl"
        ],

        Wednesday: [
            "Squats",
            "Leg Press",
            "Leg Extension",
            "Calf Raise"
        ],

        Thursday: [
            "Hip Thrust",
            "Romanian Deadlift",
            "Leg Curl",
            "Glute Kickback"
        ],

        Friday: [
            "Shoulder Press",
            "Lateral Raise",
            "Biceps Curl",
            "Triceps Extension"
        ],

        Saturday: [
            "Squats",
            "Bench Press",
            "Lat Pulldown",
            "Shoulder Press"
        ],

        Sunday: [
            "Stretching",
            "Mobility",
            "Light Walking"
        ]

    }

};


// =====================================
// GET TODAY WORKOUT EXERCISES
// =====================================

function getTodayExercises() {

    const plan =
        workoutPlans[goal];

    if (!plan) {
        return [];
    }

    return (
        plan[day] ||
        []
    );

}


// =====================================
// GET TODAY WORKOUT DATA
// =====================================

function getTodayWorkoutData() {

    const key =
        getWorkoutStorageKey();

    const saved =
        localStorage.getItem(key);


    if (!saved) {
        return {};
    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        console.log(
            "Invalid workout data:",
            key
        );

        return {};

    }

}


// =====================================
// SAVE TODAY WORKOUT DATA
// =====================================

function saveTodayWorkoutData(data) {

    const key =
        getWorkoutStorageKey();

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


// =====================================
// GET CURRENT EXERCISE INDEX
// =====================================

function getCurrentExerciseIndex() {

    const exercises =
        getTodayExercises();

    return exercises.indexOf(
        exerciseName
    );

}


// =====================================
// CHECK PREVIOUS EXERCISES
// =====================================

function arePreviousExercisesCompleted() {

    const exercises =
        getTodayExercises();

    const currentIndex =
        getCurrentExerciseIndex();


    if (
        currentIndex <= 0
    ) {

        return true;

    }


    const data =
        getTodayWorkoutData();


    for (
        let i = 0;
        i < currentIndex;
        i++
    ) {

        const previousExercise =
            exercises[i];


        if (
            data[previousExercise] !== true
        ) {

            return false;

        }

    }


    return true;

}


// =====================================
// CHECK ALL EXERCISES
// =====================================

function areAllExercisesCompleted() {

    const exercises =
        getTodayExercises();

    const data =
        getTodayWorkoutData();


    if (
        exercises.length === 0
    ) {

        return false;

    }


    for (
        let i = 0;
        i < exercises.length;
        i++
    ) {

        if (
            data[exercises[i]] !== true
        ) {

            return false;

        }

    }


    return true;

}


// =====================================
// GET FIRST INCOMPLETE EXERCISE
// =====================================

function getNextIncompleteExercise() {

    const exercises =
        getTodayExercises();

    const data =
        getTodayWorkoutData();


    for (
        let i = 0;
        i < exercises.length;
        i++
    ) {

        const exercise =
            exercises[i];


        if (
            data[exercise] !== true
        ) {

            return exercise;

        }

    }


    return null;

}


// =====================================
// UPDATE WORKOUT PROGRESS
// =====================================

function updateWorkoutProgress() {

    const exercises =
        getTodayExercises();

    const data =
        getTodayWorkoutData();


    let completedCount =
        0;


    for (
        let i = 0;
        i < exercises.length;
        i++
    ) {

        if (
            data[exercises[i]] === true
        ) {

            completedCount++;

        }

    }


    const total =
        exercises.length;


    const percentage =
        total > 0
            ? Math.round(
                (
                    completedCount /
                    total
                ) * 100
            )
            : 0;


    // =================================
    // SAVE PROGRESS
    // =================================

    data.workoutCompletedCount =
        completedCount;

    data.workoutTotal =
        total;

    data.workoutPercentage =
        percentage;


    data.workoutCompleted =
        (
            total > 0 &&
            completedCount === total
        );


    // =================================
    // SAVE STORAGE
    // =================================

    saveTodayWorkoutData(
        data
    );


    // =================================
    // UPDATE PAGE ELEMENTS
    // =================================

    const progressText =
        getElementByPossibleIds([
            "workoutProgress",
            "progressText",
            "exerciseProgress",
            "completedProgress"
        ]);


    if (progressText) {

        progressText.textContent =
            `${completedCount}/${total} Completed`;

    }


    const percentageElement =
        getElementByPossibleIds([
            "progressPercentage",
            "workoutPercentage"
        ]);


    if (percentageElement) {

        percentageElement.textContent =
            `${percentage}%`;

    }


    const progressBar =
        getElementByPossibleIds([
            "progressBar",
            "workoutProgressBar"
        ]);


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }


    console.log(
        `Workout Progress: ${completedCount}/${total} (${percentage}%)`
    );


    return {

        completedCount:
            completedCount,

        total:
            total,

        percentage:
            percentage,

        completed:
            data.workoutCompleted

    };

}


// =====================================
// SHOW NEXT WORKOUT BUTTON
// =====================================

function showNextWorkoutButton() {

    const button =
        document.getElementById(
            "nextWorkoutButton"
        );


    if (!button) {
        return;
    }


    const exercises =
        getTodayExercises();

    const data =
        getTodayWorkoutData();

    const currentIndex =
        getCurrentExerciseIndex();


    // =================================
    // CURRENT EXERCISE NOT FOUND
    // =================================

    if (
        currentIndex < 0
    ) {

        button.style.display =
            "none";

        return;

    }


    // =================================
    // CURRENT EXERCISE NOT COMPLETED
    // =================================

    if (
        data[exerciseName] !== true
    ) {

        button.style.display =
            "none";

        return;

    }


    // =================================
    // FIND NEXT INCOMPLETE
    // =================================

    let nextIndex =
        -1;


    for (
        let i = currentIndex + 1;
        i < exercises.length;
        i++
    ) {

        if (
            data[exercises[i]] !== true
        ) {

            nextIndex =
                i;

            break;

        }

    }


    // =================================
    // NO NEXT EXERCISE
    // =================================

    if (
        nextIndex === -1
    ) {

        button.style.display =
            "none";

        return;

    }


    // =================================
    // SHOW BUTTON
    // =================================

    button.style.display =
        "block";


    button.textContent =
        "Next Workout ➡️";


    button.onclick =
        function() {

            const nextExercise =
                exercises[nextIndex];


            window.location.href =
                `exercise.html?exercise=${encodeURIComponent(nextExercise)}&goal=${encodeURIComponent(goal)}&day=${encodeURIComponent(day)}`;

        };

}


// =====================================
// SAVE EXERCISE COMPLETION
// =====================================

function saveExerciseCompletion(
    completed
) {

    if (!exerciseName) {
        return;
    }


    const exercises =
        getTodayExercises();


    const currentIndex =
        getCurrentExerciseIndex();


    const data =
        getTodayWorkoutData();


    // =================================
    // INVALID EXERCISE
    // =================================

    if (
        currentIndex === -1
    ) {

        alert(
            "⚠️ Exercise not found in today's workout."
        );

        return;

    }


    // =================================
    // PREVIOUS EXERCISES MUST BE DONE
    // =================================

    if (completed) {

        if (
            !arePreviousExercisesCompleted()
        ) {

            alert(
                "⚠️ Please complete the previous exercise first."
            );


            const checkbox =
                getElementByPossibleIds([
                    "exerciseCompleted",
                    "completed",
                    "workoutCompleted"
                ]);


            if (checkbox) {

                checkbox.checked =
                    false;

            }


            return;

        }

    }


    // =================================
    // SAVE CURRENT EXERCISE
    // =================================

    data[exerciseName] =
        completed;


    // =================================
    // CALCULATE PROGRESS
    // =================================

    let completedCount =
        0;


    for (
        let i = 0;
        i < exercises.length;
        i++
    ) {

        if (
            data[exercises[i]] === true
        ) {

            completedCount++;

        }

    }


    const total =
        exercises.length;


    const percentage =
        total > 0
            ? Math.round(
                (
                    completedCount /
                    total
                ) * 100
            )
            : 0;


    const allCompleted =
        (
            total > 0 &&
            completedCount === total
        );


    // =================================
    // SAVE PROGRESS VALUES
    // =================================

    data.workoutCompletedCount =
        completedCount;

    data.workoutTotal =
        total;

    data.workoutPercentage =
        percentage;

    data.workoutCompleted =
        allCompleted;


    // =================================
    // SAVE COMPLETION TIME
    // =================================

    if (allCompleted) {

        data.workoutCompletedAt =
            new Date().toISOString();

    } else {

        delete data.workoutCompletedAt;

    }


    // =================================
    // SAVE TO LOCAL STORAGE
    // =================================

    saveTodayWorkoutData(
        data
    );


    console.log(
        "================================="
    );

    console.log(
        "Exercise:",
        exerciseName
    );

    console.log(
        "Completed:",
        completed
    );

    console.log(
        "Progress:",
        `${completedCount}/${total}`
    );

    console.log(
        "Percentage:",
        `${percentage}%`
    );

    console.log(
        "Workout Completed:",
        allCompleted
    );

    console.log(
        "================================="
    );


    // =================================
    // UPDATE PROGRESS UI
    // =================================

    updateWorkoutProgress();


    // =================================
    // UNCHECKED
    // =================================

    if (!completed) {

        showNextWorkoutButton();

        return;

    }


    // =================================
    // ALL EXERCISES COMPLETED
    // =================================

    if (allCompleted) {

        setTimeout(
            function() {

                alert(
                    "🎉 Workout Completed!\n\n🔥 Excellent work! You completed all exercises for today."
                );


                // =====================
                // AFTER OK
                // DASHBOARD
                // =====================

                window.location.href =
                    "dashboard.html";

            },
            100
        );


        return;

    }


    // =================================
    // NOT COMPLETED
    // =================================

    /*
     * IMPORTANT:
     *
     * DO NOT automatically move
     * to next exercise.
     *
     * User must click:
     *
     * Next Workout ➡️
     */

    showNextWorkoutButton();

}


// =====================================
// LOAD EXERCISE COMPLETION
// =====================================

function loadExerciseCompletion() {

    const checkbox =
        getElementByPossibleIds([
            "exerciseCompleted",
            "completed",
            "workoutCompleted"
        ]);


    if (!checkbox) {
        return;
    }


    const data =
        getTodayWorkoutData();


    // =================================
    // LOAD SAVED STATUS
    // =================================

    checkbox.checked =
        data[exerciseName] === true;


    // =================================
    // CHECKBOX CHANGE
    // =================================

    checkbox.onchange =
        function() {

            saveExerciseCompletion(
                checkbox.checked
            );

        };


    // =================================
    // SHOW NEXT BUTTON
    // =================================

    if (
        checkbox.checked
    ) {

        showNextWorkoutButton();

    }

}


// =====================================
// LOAD EXERCISE DETAILS
// =====================================

function loadExerciseDetails() {

    const exercise =
        findExercise();


    // =================================
    // EXERCISE NOT FOUND
    // =================================

    if (!exercise) {

        console.log(
            "Exercise not found:",
            exerciseName
        );


        const title =
            getElementByPossibleIds([
                "exerciseTitle",
                "workoutTitle"
            ]);


        if (title) {

            title.textContent =
                "⚠️ Exercise Not Found";

        }

        return;

    }


    // =================================
    // TITLE
    // =================================

    const title =
        getElementByPossibleIds([
            "exerciseTitle",
            "workoutTitle"
        ]);


    if (title) {

        title.textContent =
            `🏋️ ${exerciseName}`;

    }


    // =================================
    // DESCRIPTION
    // =================================

    const description =
        getElementByPossibleIds([
            "exerciseSubtitle",
            "exerciseDescription",
            "workoutDescription"
        ]);


    if (description) {

        description.textContent =
            `${
                goal === "muscleGain"
                    ? "💪 Muscle Gain"
                    : "🔥 Fat Loss"
            } • ${day}`;

    }


    // =================================
    // TARGET
    // =================================

    const target =
        getElementByPossibleIds([
            "targetMuscle",
            "target",
            "exerciseTarget"
        ]);


    if (target) {

        target.textContent =
            exercise.target;

    }


    // =================================
    // SETS & REPS
    // =================================

    const sets =
        getElementByPossibleIds([
            "setsReps",
            "sets",
            "exerciseSets"
        ]);


    if (sets) {

        sets.textContent =
            exercise.sets;

    }


    // =================================
    // REST
    // =================================

    const rest =
        getElementByPossibleIds([
            "restTime",
            "rest",
            "exerciseRest"
        ]);


    if (rest) {

        rest.textContent =
            exercise.rest;

    }


    // =================================
    // INSTRUCTIONS
    // =================================

    const instructions =
        getElementByPossibleIds([
            "instructions",
            "exerciseInstructions"
        ]);


    if (instructions) {

        instructions.innerHTML =
            "";


        const instructionText =
            exercise.instructions;


        const instructionItems =
            instructionText
                .split(". ")
                .filter(
                    function(item) {

                        return (
                            item.trim() !== ""
                        );

                    }
                );


        if (
            instructionItems.length === 0
        ) {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                instructionText;


            instructions.appendChild(
                li
            );

        } else {

            instructionItems.forEach(
                function(item) {

                    let text =
                        item.trim();


                    if (
                        !text.endsWith(".")
                    ) {

                        text += ".";

                    }


                    const li =
                        document.createElement(
                            "li"
                        );


                    li.textContent =
                        text;


                    instructions.appendChild(
                        li
                    );

                }
            );

        }

    }


    // =================================
    // FORM TIPS
    // =================================

    const formTips =
        getElementByPossibleIds([
            "formTips",
            "exerciseFormTips"
        ]);


    if (formTips) {

        formTips.textContent =
            exercise.formTips;

    }


    // =================================
    // LOAD COMPLETION
    // =================================

    loadExerciseCompletion();


    // =================================
    // UPDATE PROGRESS
    // =================================

    updateWorkoutProgress();


    // =================================
    // SHOW NEXT BUTTON
    // =================================

    const data =
        getTodayWorkoutData();


    if (
        data[exerciseName] === true
    ) {

        showNextWorkoutButton();

    }

}


// =====================================
// PREVENT DIRECT COMPLETION
// =====================================

function validateCurrentExercise() {

    const checkbox =
        getElementByPossibleIds([
            "exerciseCompleted",
            "completed",
            "workoutCompleted"
        ]);


    if (!checkbox) {
        return;
    }


    const currentIndex =
        getCurrentExerciseIndex();


    // =================================
    // FIRST EXERCISE
    // =================================

    if (
        currentIndex <= 0
    ) {

        return;

    }


    // =================================
    // CHECK PREVIOUS EXERCISES
    // =================================

    if (
        checkbox.checked &&
        !arePreviousExercisesCompleted()
    ) {

        checkbox.checked =
            false;


        const data =
            getTodayWorkoutData();


        delete data[exerciseName];


        saveTodayWorkoutData(
            data
        );


        updateWorkoutProgress();

    }

}


// =====================================
// OPEN TODAY'S WORKOUT
// =====================================

function openTodaysWorkout() {

    const exercises =
        getTodayExercises();


    const data =
        getTodayWorkoutData();


    // =================================
    // NO WORKOUT
    // =================================

    if (
        exercises.length === 0
    ) {

        alert(
            "⚠️ No workout found for today."
        );

        return;

    }


    // =================================
    // ALREADY COMPLETED
    // =================================

    if (
        data.workoutCompleted === true
    ) {

        alert(
            "🎉 Today's workout is already completed!"
        );

        return;

    }


    // =================================
    // FIND NEXT INCOMPLETE
    // =================================

    const nextExercise =
        getNextIncompleteExercise();


    if (!nextExercise) {
        return;
    }


    // =================================
    // OPEN FIRST INCOMPLETE EXERCISE
    // =================================

    window.location.href =
        `exercise.html?exercise=${encodeURIComponent(nextExercise)}&goal=${encodeURIComponent(goal)}&day=${encodeURIComponent(day)}`;

}


// =====================================
// PAGE LOAD
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadExerciseDetails();

        validateCurrentExercise();

        updateWorkoutProgress();

    }
);
