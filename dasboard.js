// =====================================
// CHAMPION HABIT TRACKER
// DASHBOARD.JS
// PHASE 7 - FINAL SAFE WORKOUT SYNC
// =====================================


// =====================================
// GET CURRENT USER
// =====================================

function getCurrentUser() {

    return (
        localStorage.getItem("user") ||
        "Jamal"
    );

}


// =====================================
// GET TODAY DATE KEY
// YYYY-MM-DD
// =====================================

function getTodayDateKey() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// =====================================
// GET TODAY HABIT KEY
// YYYY_MM_DD
// =====================================

function getTodayHabitKey() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    return `${year}_${month}_${day}`;

}


// =====================================
// HABIT LIST
// =====================================

const dashboardHabitIds = [

    "wakeUp",
    "water",
    "milk",
    "eggs",
    "breakfast",
    "protein",

    "warmUp",
    "workout",
    "correctForm",
    "stretching",

    "lunch",
    "eveningSnack",
    "fruits",
    "dinner",
    "noJunkFood",

    "hydration",

    "steps",
    "walking",

    "nightMilk",
    "sleepBefore",
    "sleepHours"

];


// =====================================
// TOTAL HABITS
// =====================================

function getTotalHabits() {

    return dashboardHabitIds.length;

}


// =====================================
// GET TODAY CHECKLIST REPORT
// =====================================

function getTodayHabitReport() {

    const user =
        getCurrentUser();

    const today =
        getTodayHabitKey();

    const reportKey =
        `${user}_${today}`;

    const savedReport =
        localStorage.getItem(
            reportKey
        );

    if (!savedReport) {

        return {};

    }

    try {

        const report =
            JSON.parse(
                savedReport
            );

        if (
            report &&
            typeof report === "object"
        ) {

            return report;

        }

    }
    catch (error) {

        console.log(
            "Dashboard habit report error:",
            error
        );

    }

    return {};

}


// =====================================
// GET COMPLETED HABITS
// =====================================

function getHabitCompletedCount() {

    const report =
        getTodayHabitReport();

    let completed = 0;

    dashboardHabitIds.forEach(
        function(id) {

            if (
                report[id] === true ||
                report[id] === "true"
            ) {

                completed++;

            }

        }
    );

    return completed;

}


// =====================================
// GET HABIT PERCENTAGE
// =====================================

function getHabitPercentage() {

    const total =
        getTotalHabits();

    const completed =
        getHabitCompletedCount();

    if (total === 0) {

        return 0;

    }

    return Math.round(
        (
            completed /
            total
        ) * 100
    );

}


// =====================================
// WORKOUT PLANS
// =====================================

const dashboardWorkoutPlans = {

    // =================================
    // FAT LOSS
    // =================================

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


    // =================================
    // MUSCLE GAIN
    // =================================

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
// GET TODAY DAY NAME
// =====================================

function getTodayDayName() {

    const days = [

        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"

    ];

    return days[
        new Date().getDay()
    ];

}


// =====================================
// GET WORKOUT GOAL
// =====================================
//
// IMPORTANT
//
// Priority:
//
// 1. workoutGoal localStorage
// 2. Existing workout completion keys
// 3. Existing old workoutCompleted keys
// 4. Current workout data
// 5. Default = fatLoss
//
// This prevents Goal from showing
// "not selected" when workout data
// already exists.
// =====================================

function getWorkoutGoal() {

    // =================================
    // CURRENT USER
    // =================================

    const user =
        getCurrentUser();


    // =================================
    // TODAY DATE
    // =================================

    const today =
        getTodayDateKey();


    // =================================
    // TODAY DAY
    // =================================

    const day =
        getTodayDayName();


    // =================================
    // 1. CHECK SAVED WORKOUT GOAL
    // =================================

    const savedGoal =
        localStorage.getItem(
            "workoutGoal"
        );


    if (
        savedGoal === "fatLoss" ||
        savedGoal === "muscleGain"
    ) {

        return savedGoal;

    }


    // =================================
    // GET ALL LOCAL STORAGE KEYS
    // =================================

    const keys =
        Object.keys(
            localStorage
        );


    // =================================
    // 2. CHECK CURRENT WORKOUT KEYS
    //
    // New format:
    //
    // workout_2026-08-11_Jamal_fatLoss_Tuesday_Exercise
    //
    // workout_2026-08-11_Jamal_muscleGain_Tuesday_Exercise
    // =================================

    const newFatLossPrefix =
        `workout_${today}_${user}_fatLoss_${day}_`;

    const newMuscleGainPrefix =
        `workout_${today}_${user}_muscleGain_${day}_`;


    for (
        let i = 0;
        i < keys.length;
        i++
    ) {

        const key =
            keys[i];


        if (
            key.startsWith(
                newFatLossPrefix
            )
        ) {

            localStorage.setItem(
                "workoutGoal",
                "fatLoss"
            );

            return "fatLoss";

        }


        if (
            key.startsWith(
                newMuscleGainPrefix
            )
        ) {

            localStorage.setItem(
                "workoutGoal",
                "muscleGain"
            );

            return "muscleGain";

        }

    }


    // =================================
    // 3. CHECK OLD WORKOUT COMPLETION
    //
    // Old format:
    //
    // workoutCompleted_fatLoss_Tuesday_Exercise_2026-08-11
    //
    // workoutCompleted_muscleGain_Tuesday_Exercise_2026-08-11
    // =================================

    const oldFatLossPrefix =
        `workoutCompleted_fatLoss_${day}_`;

    const oldMuscleGainPrefix =
        `workoutCompleted_muscleGain_${day}_`;


    for (
        let i = 0;
        i < keys.length;
        i++
    ) {

        const key =
            keys[i];


        if (
            key.startsWith(
                oldFatLossPrefix
            ) &&
            key.endsWith(
                `_${today}`
            )
        ) {

            localStorage.setItem(
                "workoutGoal",
                "fatLoss"
            );

            return "fatLoss";

        }


        if (
            key.startsWith(
                oldMuscleGainPrefix
            ) &&
            key.endsWith(
                `_${today}`
            )
        ) {

            localStorage.setItem(
                "workoutGoal",
                "muscleGain"
            );

            return "muscleGain";

        }

    }


    // =================================
    // 4. CHECK USER WORKOUT DATA
    //
    // New JSON format:
    //
    // Jamal_workout_2026_08_11
    //
    // This data does not contain goal.
    // So we don't guess goal from it.
    // =================================

    const workoutStorageKey =
        getWorkoutStorageKey();

    const workoutSaved =
        localStorage.getItem(
            workoutStorageKey
        );


    if (workoutSaved) {

        try {

            const workoutData =
                JSON.parse(
                    workoutSaved
                );


            if (
                workoutData &&
                typeof workoutData === "object"
            ) {

                /*
                    Workout data exists,
                    but goal is not stored
                    inside this JSON.

                    Therefore we continue
                    to the final fallback.
                */

                console.log(
                    "Workout data found, but goal is not stored in JSON."
                );

            }

        }
        catch (error) {

            console.log(
                "Workout JSON read error:",
                error
            );

        }

    }


    // =================================
    // 5. CHECK POSSIBLE SESSION DATA
    // =================================

    const sessionGoal =
        sessionStorage.getItem(
            "workoutGoal"
        );


    if (
        sessionGoal === "fatLoss" ||
        sessionGoal === "muscleGain"
    ) {

        localStorage.setItem(
            "workoutGoal",
            sessionGoal
        );

        return sessionGoal;

    }


    // =================================
    // 6. DEFAULT
    //
    // Existing app default is FAT LOSS.
    // =================================

    localStorage.setItem(
        "workoutGoal",
        "fatLoss"
    );

    return "fatLoss";

}


// =====================================
// GET TODAY WORKOUT
// =====================================

function getTodayWorkout() {

    const goal =
        getWorkoutGoal();

    const day =
        getTodayDayName();


    if (
        !dashboardWorkoutPlans[goal]
    ) {

        return [];

    }


    if (
        !dashboardWorkoutPlans[goal][day]
    ) {

        return [];

    }


    return dashboardWorkoutPlans[
        goal
    ][day];

}


// =====================================
// GET WORKOUT STORAGE KEY
// =====================================
//
// MUST MATCH exercise.js
//
// Example:
//
// Jamal_workout_2026_08_11
//
// =====================================

function getWorkoutStorageKey() {

    const user =
        getCurrentUser();

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    return (
        `${user}_workout_${year}_${month}_${day}`
    );

}


// =====================================
// GET TODAY WORKOUT DATA
// =====================================

function getTodayWorkoutData() {

    const key =
        getWorkoutStorageKey();


    const saved =
        localStorage.getItem(
            key
        );


    if (!saved) {

        return {};

    }


    try {

        const data =
            JSON.parse(
                saved
            );


        if (
            data &&
            typeof data === "object"
        ) {

            return data;

        }

    }
    catch (error) {

        console.log(
            "Invalid workout data:",
            key,
            error
        );

    }


    return {};

}


// =====================================
// CHECK EXERCISE COMPLETED
// =====================================

function isWorkoutExerciseCompleted(
    exercise
) {

    const data =
        getTodayWorkoutData();


    return (
        data[exercise] === true
    );

}


// =====================================
// GET TODAY WORKOUT PROGRESS
// =====================================

function getTodayWorkoutProgress() {

    const workout =
        getTodayWorkout();


    if (
        workout.length === 0
    ) {

        return {

            completed: 0,

            total: 0,

            percentage: 0

        };

    }


    let completed = 0;


    workout.forEach(
        function(exercise) {

            if (
                isWorkoutExerciseCompleted(
                    exercise
                )
            ) {

                completed++;

            }

        }
    );


    const total =
        workout.length;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (
                    completed /
                    total
                ) * 100
            );


    return {

        completed:
            completed,

        total:
            total,

        percentage:
            percentage

    };

}


// =====================================
// OPEN TODAY'S WORKOUT
// =====================================

function openTodayWorkout() {

    const goal =
        getWorkoutGoal();

    const day =
        getTodayDayName();


    if (!goal) {

        alert(
            "Please select a workout goal first."
        );

        return;

    }


    if (
        !dashboardWorkoutPlans[goal] ||
        !dashboardWorkoutPlans[goal][day]
    ) {

        alert(
            "Today's workout is not available."
        );

        return;

    }


    const url =
        `workout-day.html?goal=${encodeURIComponent(goal)}&day=${encodeURIComponent(day)}`;


    window.location.href =
        url;

}


// =====================================
// UPDATE TODAY PROGRESS
// =====================================

function updateTodayProgress() {

    // =================================
    // HABIT PROGRESS
    // =================================

    const habitCompleted =
        getHabitCompletedCount();


    const habitTotal =
        getTotalHabits();


    // =================================
    // WORKOUT PROGRESS
    // =================================

    const workout =
        getTodayWorkoutProgress();


    // =================================
    // GOAL
    // =================================

    const workoutGoal =
        getWorkoutGoal();


    // =================================
    // DAY
    // =================================

    const day =
        getTodayDayName();


    // =================================
    // COMBINED PROGRESS
    // =================================

    const combinedTotal =
        habitTotal +
        workout.total;


    const combinedCompleted =
        habitCompleted +
        workout.completed;


    let percentage = 0;


    if (
        combinedTotal > 0
    ) {

        percentage =
            Math.round(
                (
                    combinedCompleted /
                    combinedTotal
                ) * 100
            );

    }


    // =================================
    // TODAY COMPLETED
    // =================================

    const todayCompleted =
        document.getElementById(
            "todayCompleted"
        );


    if (todayCompleted) {

        todayCompleted.textContent =
            `Completed : ${combinedCompleted} / ${combinedTotal}`;

    }


    // =================================
    // TODAY PERCENTAGE
    // =================================

    const todayPercentage =
        document.getElementById(
            "todayPercentage"
        );


    if (todayPercentage) {

        todayPercentage.textContent =
            `Progress : ${percentage}%`;

    }


    // =================================
    // TODAY PROGRESS BAR
    // =================================

    const todayProgressBar =
        document.getElementById(
            "todayProgressBar"
        );


    if (todayProgressBar) {

        todayProgressBar.value =
            percentage;

    }


    // =================================
    // WORKOUT GOAL
    // =================================

    const workoutGoalElement =
        document.getElementById(
            "workoutGoal"
        );


    if (workoutGoalElement) {

        if (
            workoutGoal === "muscleGain"
        ) {

            workoutGoalElement.textContent =
                "Goal : Muscle Gain 💪";

        }
        else {

            workoutGoalElement.textContent =
                "Goal : Fat Loss 🔥";

        }

    }


    // =================================
    // WORKOUT DAY
    // =================================

    const workoutDayElement =
        document.getElementById(
            "workoutDay"
        );


    if (workoutDayElement) {

        workoutDayElement.textContent =
            `Day : ${day}`;

    }


    // =================================
    // WORKOUT COMPLETED
    // =================================

    const workoutCompleted =
        document.getElementById(
            "workoutCompleted"
        );


    if (workoutCompleted) {

        workoutCompleted.textContent =
            `🏋️ Workout Progress : ${workout.completed} / ${workout.total}`;

    }


    // =================================
    // WORKOUT PERCENTAGE
    // =================================

    const workoutPercentage =
        document.getElementById(
            "workoutPercentage"
        );


    if (workoutPercentage) {

        workoutPercentage.textContent =
            `Progress : ${workout.percentage}%`;

    }


    // =================================
    // WORKOUT PROGRESS BAR
    // =================================

    const workoutProgressBar =
        document.getElementById(
            "workoutProgressBar"
        );


    if (workoutProgressBar) {

        workoutProgressBar.value =
            workout.percentage;

    }


    // =================================
    // WORKOUT STATUS
    // =================================

    const workoutStatus =
        document.getElementById(
            "workoutStatus"
        );


    if (workoutStatus) {

        if (
            workout.total > 0 &&
            workout.completed ===
            workout.total
        ) {

            workoutStatus.textContent =
                "🏆 Workout Completed 🎉";

        }
        else if (
            workout.completed > 0
        ) {

            workoutStatus.textContent =
                "💪 Workout In Progress";

        }
        else {

            workoutStatus.textContent =
                "💪 Workout Not Started";

        }

    }


    // =================================
    // WORKOUT TITLE
    // =================================

    const dashboardWorkoutTitle =
        document.getElementById(
            "dashboardWorkoutTitle"
        );


    if (dashboardWorkoutTitle) {

        dashboardWorkoutTitle.textContent =
            `🏋️ Today's Workout - ${day}`;

    }


    // =================================
    // DEBUG LOG
    // =================================

    console.log(
        "Today's Dashboard Progress:",
        {

            user:
                getCurrentUser(),

            today:
                getTodayDateKey(),

            day:
                day,

            workoutGoal:
                workoutGoal,

            workoutStorageKey:
                getWorkoutStorageKey(),

            habits:
                `${habitCompleted}/${habitTotal}`,

            workout:
                `${workout.completed}/${workout.total}`,

            workoutPercentage:
                `${workout.percentage}%`,

            combined:
                `${combinedCompleted}/${combinedTotal}`,

            percentage:
                `${percentage}%`

        }
    );

}


// =====================================
// GET REPORT FOR DATE
// =====================================

function getUserReportForDate(
    user,
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const key =
        `${user}_${year}_${month}_${day}`;


    const savedReport =
        localStorage.getItem(
            key
        );


    if (!savedReport) {

        return null;

    }


    try {

        return JSON.parse(
            savedReport
        );

    }
    catch (error) {

        console.log(
            "Invalid report:",
            key
        );

        return null;

    }

}


// =====================================
// GET REPORT PROGRESS
// =====================================

function getReportProgress(
    report
) {

    if (!report) {

        return {

            completed: 0,

            percentage: 0

        };

    }


    let completed = 0;


    dashboardHabitIds.forEach(
        function(id) {

            if (
                report[id] === true ||
                report[id] === "true"
            ) {

                completed++;

            }

        }
    );


    const total =
        getTotalHabits();


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (
                    completed /
                    total
                ) * 100
            );


    return {

        completed:
            completed,

        percentage:
            percentage

    };

}


// =====================================
// CALCULATE WEEKLY AVERAGE
// =====================================

function calculateWeeklyAverage() {

    const user =
        getCurrentUser();


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const todayDay =
        today.getDay();


    const monday =
        new Date(
            today
        );


    const difference =
        todayDay === 0
            ? -6
            : 1 - todayDay;


    monday.setDate(
        today.getDate() +
        difference
    );


    monday.setHours(
        0,
        0,
        0,
        0
    );


    let total = 0;

    let tracked = 0;


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const date =
            new Date(
                monday
            );


        date.setDate(
            monday.getDate() +
            i
        );


        date.setHours(
            0,
            0,
            0,
            0
        );


        if (
            date > today
        ) {

            continue;

        }


        const report =
            getUserReportForDate(
                user,
                date
            );


        if (!report) {

            continue;

        }


        const result =
            getReportProgress(
                report
            );


        total +=
            result.percentage;


        tracked++;

    }


    if (
        tracked === 0
    ) {

        return 0;

    }


    return Math.round(
        total /
        tracked
    );

}


// =====================================
// CALCULATE MONTHLY AVERAGE
// =====================================

function calculateMonthlyAverage() {

    const user =
        getCurrentUser();


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const year =
        today.getFullYear();


    const month =
        today.getMonth();


    let total = 0;

    let tracked = 0;


    for (
        let day = 1;
        day <= today.getDate();
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        const report =
            getUserReportForDate(
                user,
                date
            );


        if (!report) {

            continue;

        }


        const result =
            getReportProgress(
                report
            );


        total +=
            result.percentage;


        tracked++;

    }


    if (
        tracked === 0
    ) {

        return 0;

    }


    return Math.round(
        total /
        tracked
    );

}


// =====================================
// CALCULATE OVERALL AVERAGE
// =====================================

function calculateOverallAverage() {

    const user =
        getCurrentUser();


    let total = 0;

    let tracked = 0;


    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        const key =
            localStorage.key(i);


        if (
            !key ||
            !key.startsWith(
                user + "_"
            )
        ) {

            continue;

        }


        const parts =
            key.split("_");


        if (
            parts.length !== 4
        ) {

            continue;

        }


        const savedReport =
            localStorage.getItem(
                key
            );


        if (!savedReport) {

            continue;

        }


        try {

            const report =
                JSON.parse(
                    savedReport
                );


            const result =
                getReportProgress(
                    report
                );


            total +=
                result.percentage;


            tracked++;

        }
        catch (error) {

            console.log(
                "Invalid overall report:",
                key
            );

        }

    }


    if (
        tracked === 0
    ) {

        return 0;

    }


    return Math.round(
        total /
        tracked
    );

}


// =====================================
// UPDATE AVERAGE DISPLAYS
// =====================================

function updateAverageDisplays() {

    const weeklyAverage =
        calculateWeeklyAverage();


    const monthlyAverage =
        calculateMonthlyAverage();


    const overallAverage =
        calculateOverallAverage();


    // =================================
    // WEEKLY
    // =================================

    const weeklyText =
        document.getElementById(
            "dashboardWeeklyAverage"
        );


    const weeklyBar =
        document.getElementById(
            "dashboardWeeklyBar"
        );


    if (weeklyText) {

        weeklyText.textContent =
            `Weekly Average : ${weeklyAverage}%`;

    }


    if (weeklyBar) {

        weeklyBar.value =
            weeklyAverage;

    }


    // =================================
    // MONTHLY
    // =================================

    const monthlyText =
        document.getElementById(
            "dashboardMonthlyAverage"
        );


    const monthlyBar =
        document.getElementById(
            "dashboardMonthlyBar"
        );


    if (monthlyText) {

        monthlyText.textContent =
            `Monthly Average : ${monthlyAverage}%`;

    }


    if (monthlyBar) {

        monthlyBar.value =
            monthlyAverage;

    }


    // =================================
    // OVERALL
    // =================================

    const overallText =
        document.getElementById(
            "overallAverage"
        );


    const overallBar =
        document.getElementById(
            "overallProgressBar"
        );


    if (overallText) {

        overallText.textContent =
            `Overall Average : ${overallAverage}%`;

    }


    if (overallBar) {

        overallBar.value =
            overallAverage;

    }

}


// =====================================
// CALCULATE CURRENT STREAK
// =====================================

function calculateCurrentStreak() {

    const user =
        getCurrentUser();


    let today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    let streak = 0;


    while (true) {

        const report =
            getUserReportForDate(
                user,
                today
            );


        if (!report) {

            break;

        }


        streak++;


        today.setDate(
            today.getDate() - 1
        );

    }


    return streak;

}


// =====================================
// CALCULATE BEST STREAK
// =====================================

function calculateBestStreak() {

    const user =
        getCurrentUser();


    const dates = [];


    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        const key =
            localStorage.key(i);


        if (
            !key ||
            !key.startsWith(
                user + "_"
            )
        ) {

            continue;

        }


        const parts =
            key.split("_");


        if (
            parts.length !== 4
        ) {

            continue;

        }


        const year =
            Number(
                parts[1]
            );


        const month =
            Number(
                parts[2]
            );


        const day =
            Number(
                parts[3]
            );


        dates.push(
            new Date(
                year,
                month - 1,
                day
            )
        );

    }


    if (
        dates.length === 0
    ) {

        return 0;

    }


    dates.sort(
        function(a, b) {

            return a - b;

        }
    );


    let best = 1;

    let current = 1;


    for (
        let i = 1;
        i < dates.length;
        i++
    ) {

        const difference =
            Math.round(
                (
                    dates[i] -
                    dates[i - 1]
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (
            difference === 1
        ) {

            current++;

        }
        else if (
            difference > 1
        ) {

            current = 1;

        }


        if (
            current > best
        ) {

            best =
                current;

        }

    }


    return best;

}


// =====================================
// UPDATE STREAK DISPLAY
// =====================================

function updateStreakDisplay() {

    const current =
        calculateCurrentStreak();


    const best =
        calculateBestStreak();


    const currentElement =
        document.getElementById(
            "currentStreak"
        );


    const bestElement =
        document.getElementById(
            "bestStreak"
        );


    if (currentElement) {

        currentElement.textContent =
            `${current} Day${current === 1 ? "" : "s"}`;

    }


    if (bestElement) {

        bestElement.textContent =
            `${best} Day${best === 1 ? "" : "s"}`;

    }

}


// =====================================
// LOAD DASHBOARD
// =====================================

function loadDashboard() {

    const user =
        getCurrentUser();


    // =================================
    // WELCOME
    // =================================

    const welcomeText =
        document.getElementById(
            "welcomeText"
        );


    if (welcomeText) {

        welcomeText.textContent =
            `Welcome ${user} 👋`;

    }


    // =================================
    // TODAY PROGRESS
    // =================================

    updateTodayProgress();


    // =================================
    // AVERAGES
    // =================================

    updateAverageDisplays();


    // =================================
    // STREAK
    // =================================

    updateStreakDisplay();


    // =================================
    // DEBUG
    // =================================

    console.log(
        "================================="
    );

    console.log(
        "DASHBOARD LOADED"
    );

    console.log(
        "User:",
        getCurrentUser()
    );

    console.log(
        "Date:",
        getTodayDateKey()
    );

    console.log(
        "Day:",
        getTodayDayName()
    );

    console.log(
        "Goal:",
        getWorkoutGoal()
    );

    console.log(
        "Workout:",
        getTodayWorkout()
    );

    console.log(
        "Workout Data:",
        getTodayWorkoutData()
    );

    console.log(
        "Workout Progress:",
        getTodayWorkoutProgress()
    );

    console.log(
        "================================="
    );

}


// =====================================
// PAGE LOAD
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadDashboard();

    }
);


// =====================================
// SERVICE WORKER
// =====================================

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function() {

            navigator.serviceWorker
                .register(
                    "service-worker.js"
                )
                .then(
                    function() {

                        console.log(
                            "Service Worker Registered ✅"
                        );

                    }
                )
                .catch(
                    function(error) {

                        console.log(
                            "Service Worker Error:",
                            error
                        );

                    }
                );

        }
    );

}
