// =====================================
// CHAMPION HABIT TRACKER
// WORKOUT.JS
// PHASE 2 FINAL
// =====================================


// =====================================
// WORKOUT PLANS
// =====================================

const workoutPlans = {

    fatLoss: {

        title: "🔥 Fat Loss Workout",

        description:
            "Strength training + cardio + activity focused workout plan.",

        days: {

            Monday: {
                focus: "🏋️ Upper Body",
                exercises: [
                    "Chest Press",
                    "Shoulder Press",
                    "Lateral Raise",
                    "Triceps Pushdown"
                ]
            },

            Tuesday: {
                focus: "💪 Back & Biceps",
                exercises: [
                    "Lat Pulldown",
                    "Seated Row",
                    "Dumbbell Row",
                    "Biceps Curl"
                ]
            },

            Wednesday: {
                focus: "🦵 Lower Body",
                exercises: [
                    "Squats",
                    "Leg Press",
                    "Leg Extension",
                    "Calf Raise"
                ]
            },

            Thursday: {
                focus: "🍑 Glutes & Hamstrings",
                exercises: [
                    "Hip Thrust",
                    "Leg Curl",
                    "Lunges",
                    "Glute Kickback"
                ]
            },

            Friday: {
                focus: "🔥 Core + Cardio",
                exercises: [
                    "Crunches",
                    "Plank",
                    "Mountain Climbers",
                    "Incline Walking"
                ]
            },

            Saturday: {
                focus: "🏋️ Full Body",
                exercises: [
                    "Squats",
                    "Push-ups",
                    "Lat Pulldown",
                    "Walking"
                ]
            },

            Sunday: {
                focus: "🧘 Recovery",
                exercises: [
                    "Full Body Stretching",
                    "Mobility",
                    "Light Walking"
                ]
            }
        }
    },


    muscleGain: {

        title: "💪 Muscle Gain Workout",

        description:
            "Strength-focused workout plan with progressive resistance training.",

        days: {

            Monday: {
                focus: "🏋️ Chest + Triceps",
                exercises: [
                    "Bench Press",
                    "Incline Dumbbell Press",
                    "Chest Fly",
                    "Triceps Pushdown"
                ]
            },

            Tuesday: {
                focus: "💪 Back + Biceps",
                exercises: [
                    "Lat Pulldown",
                    "Seated Cable Row",
                    "Dumbbell Row",
                    "Biceps Curl"
                ]
            },

            Wednesday: {
                focus: "🦵 Legs",
                exercises: [
                    "Squats",
                    "Leg Press",
                    "Leg Extension",
                    "Calf Raise"
                ]
            },

            Thursday: {
                focus: "🍑 Glutes + Hamstrings",
                exercises: [
                    "Hip Thrust",
                    "Romanian Deadlift",
                    "Leg Curl",
                    "Glute Kickback"
                ]
            },

            Friday: {
                focus: "🦾 Shoulders + Arms",
                exercises: [
                    "Shoulder Press",
                    "Lateral Raise",
                    "Biceps Curl",
                    "Triceps Extension"
                ]
            },

            Saturday: {
                focus: "🏋️ Full Body Strength",
                exercises: [
                    "Squats",
                    "Bench Press",
                    "Lat Pulldown",
                    "Shoulder Press"
                ]
            },

            Sunday: {
                focus: "🧘 Recovery",
                exercises: [
                    "Stretching",
                    "Mobility",
                    "Light Walking"
                ]
            }
        }
    }
};


// =====================================
// URL PARAMETERS
// =====================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const goal =
    urlParams.get("goal") || "fatLoss";

const day =
    urlParams.get("day");


// =====================================
// WORKOUT PAGE
// =====================================

function loadWorkoutPlan() {

    const workoutPlan =
        document.getElementById(
            "workoutPlan"
        );

    const selectedGoalElement =
        document.getElementById(
            "selectedGoal"
        );

    const goalDescription =
        document.getElementById(
            "goalDescription"
        );

    if (!workoutPlan) {
        return;
    }


    const plan =
        workoutPlans[goal];

    if (!plan) {
        return;
    }


    if (selectedGoalElement) {

        selectedGoalElement.textContent =
            plan.title;

    }


    if (goalDescription) {

        goalDescription.textContent =
            plan.description;

    }


    workoutPlan.innerHTML = "";


    Object.keys(plan.days)
        .forEach(function(dayName) {

            const workout =
                plan.days[dayName];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "dashboard-card";


            card.style.cursor =
                "pointer";


            card.innerHTML = `

                <h3>
                    📅 ${dayName}
                </h3>

                <h4>
                    ${workout.focus}
                </h4>

                <p>
                    🏋️ ${workout.exercises.length}
                    Exercises
                </p>

                <p>
                    👉 Tap to view workout
                </p>

            `;


            card.addEventListener(
                "click",
                function() {

                    window.location =
                        `workout-day.html?goal=${goal}&day=${encodeURIComponent(dayName)}`;

                }
            );


            workoutPlan.appendChild(
                card
            );

        });
}


// =====================================
// WORKOUT DAY PAGE
// =====================================

function loadWorkoutDay() {

    const exerciseList =
        document.getElementById(
            "exerciseList"
        );

    if (!exerciseList || !day) {
        return;
    }


    const plan =
        workoutPlans[goal];

    if (!plan || !plan.days[day]) {

        exerciseList.innerHTML = `
            <div class="dashboard-card">
                <h3>⚠️ Workout Not Found</h3>
                <p>Please go back and select a valid workout.</p>
            </div>
        `;

        return;
    }


    const workout =
        plan.days[day];


    const workoutTitle =
        document.getElementById(
            "workoutTitle"
        );

    const workoutDescription =
        document.getElementById(
            "workoutDescription"
        );


    if (workoutTitle) {

        workoutTitle.textContent =
            `${plan.title} - ${day}`;

    }


    if (workoutDescription) {

        workoutDescription.textContent =
            workout.focus;

    }


    exerciseList.innerHTML = "";


    workout.exercises
        .forEach(function(exercise, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "dashboard-card";


            card.style.cursor =
                "pointer";


            card.innerHTML = `

                <h3>
                    ${index + 1}. ${exercise}
                </h3>

                <p>
                    👆 Tap to start
                </p>

            `;


            card.addEventListener(
                "click",
                function() {

                    window.location =
                        `exercise.html?exercise=${encodeURIComponent(exercise)}&goal=${goal}&day=${encodeURIComponent(day)}`;

                }
            );


            exerciseList.appendChild(
                card
            );

        });
}


// =====================================
// PAGE LOAD
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadWorkoutPlan();

        loadWorkoutDay();

    }
);
