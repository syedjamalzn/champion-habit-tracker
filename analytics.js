// =====================================
// CHAMPION HABIT TRACKER
// ANALYTICS.JS
// PHASE 6
// =====================================


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
// GET TODAY
// =====================================

function getToday() {

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    return today;

}


// =====================================
// DATE FROM KEY
// =====================================

function getDateFromKey(key) {

    const match =
        key.match(
            /(\d{4})_(\d{2})_(\d{2})/
        );

    if (!match) {
        return null;
    }

    const year =
        Number(match[1]);

    const month =
        Number(match[2]) - 1;

    const date =
        Number(match[3]);

    const result =
        new Date(
            year,
            month,
            date
        );

    result.setHours(
        0,
        0,
        0,
        0
    );

    return result;

}


// =====================================
// FORMAT DATE
// =====================================

function formatDate(date) {

    if (!date) {
        return "--";
    }

    return (
        String(date.getDate()).padStart(2, "0") +
        "/" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "/" +
        date.getFullYear()
    );

}


// =====================================
// READ JSON
// =====================================

function readStorageValue(key) {

    const value =
        localStorage.getItem(key);

    if (!value) {
        return null;
    }

    try {

        return JSON.parse(value);

    } catch (error) {

        return value;

    }

}


// =====================================
// GET USER DATA
// =====================================

function getUserAnalyticsData() {

    const user =
        getCurrentUser();

    const records = [];


    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        const key =
            localStorage.key(i);


        if (!key) {
            continue;
        }


        // =================================
        // ONLY CURRENT USER
        // =================================

        if (
            !key.startsWith(
                user + "_"
            )
        ) {

            continue;

        }


        // =================================
        // IGNORE WORKOUT KEYS
        // FOR NORMAL HABIT DATA
        // =================================

        const date =
            getDateFromKey(key);


        if (!date) {
            continue;
        }


        const value =
            readStorageValue(key);


        if (
            !value ||
            typeof value !== "object"
        ) {

            continue;

        }


        records.push({

            key:
                key,

            date:
                date,

            data:
                value

        });

    }


    return records;

}


// =====================================
// GET WORKOUT DATA
// =====================================

function getWorkoutRecords() {

    const user =
        getCurrentUser();

    const records = [];


    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        const key =
            localStorage.key(i);


        if (!key) {
            continue;
        }


        if (
            !key.startsWith(
                user + "_workout_"
            )
        ) {

            continue;

        }


        const date =
            getDateFromKey(key);


        if (!date) {
            continue;
        }


        const data =
            readStorageValue(key);


        if (
            !data ||
            typeof data !== "object"
        ) {

            continue;

        }


        records.push({

            key:
                key,

            date:
                date,

            data:
                data

        });

    }


    records.sort(
        function(a, b) {

            return (
                a.date - b.date
            );

        }
    );


    return records;

}


// =====================================
// GET ALL RECORDS
// =====================================

function getAllRecords() {

    const habitRecords =
        getUserAnalyticsData();


    const workoutRecords =
        getWorkoutRecords();


    const map =
        new Map();


    // =================================
    // HABIT DATA
    // =================================

    habitRecords.forEach(
        function(record) {

            const key =
                formatDate(
                    record.date
                );

            map.set(
                key,
                {
                    date:
                        record.date,

                    data:
                        record.data,

                    workout:
                        null
                }
            );

        }
    );


    // =================================
    // WORKOUT DATA
    // =================================

    workoutRecords.forEach(
        function(record) {

            const key =
                formatDate(
                    record.date
                );


            if (!map.has(key)) {

                map.set(
                    key,
                    {
                        date:
                            record.date,

                        data:
                            {},

                        workout:
                            record.data
                    }
                );

            } else {

                map.get(key).workout =
                    record.data;

            }

        }
    );


    const result =
        Array.from(
            map.values()
        );


    result.sort(
        function(a, b) {

            return (
                a.date - b.date
            );

        }
    );


    return result;

}


// =====================================
// GET COMPLETION PERCENTAGE
// =====================================

function getCompletionPercentage(data) {

    if (!data) {
        return 0;
    }


    // Existing report style

    if (
        typeof data.progressPercentage ===
        "number"
    ) {

        return data.progressPercentage;

    }


    if (
        typeof data.percentage ===
        "number"
    ) {

        return data.percentage;

    }


    if (
        typeof data.completedCount ===
        "number" &&
        typeof data.total ===
        "number" &&
        data.total > 0
    ) {

        return Math.round(
            (
                data.completedCount /
                data.total
            ) * 100
        );

    }


    // Search common fields

    if (
        typeof data.progress ===
        "number"
    ) {

        return data.progress;

    }


    return 0;

}


// =====================================
// GET WORKOUT PERCENTAGE
// =====================================

function getWorkoutPercentage(workout) {

    if (!workout) {
        return 0;
    }


    if (
        typeof workout.workoutPercentage ===
        "number"
    ) {

        return workout.workoutPercentage;

    }


    if (
        typeof workout.percentage ===
        "number"
    ) {

        return workout.percentage;

    }


    if (
        typeof workout.workoutCompletedCount ===
        "number" &&
        typeof workout.workoutTotal ===
        "number" &&
        workout.workoutTotal > 0
    ) {

        return Math.round(
            (
                workout.workoutCompletedCount /
                workout.workoutTotal
            ) * 100
        );

    }


    return 0;

}


// =====================================
// CALCULATE TODAY
// =====================================

function calculateToday(records) {

    const today =
        getToday();


    const record =
        records.find(
            function(item) {

                return (
                    item.date.getTime() ===
                    today.getTime()
                );

            }
        );


    if (!record) {

        return {
            percentage: 0,
            workout: 0
        };

    }


    return {

        percentage:
            getCompletionPercentage(
                record.data
            ),

        workout:
            getWorkoutPercentage(
                record.workout
            )

    };

}


// =====================================
// WEEKLY RECORDS
// =====================================

function getWeeklyRecords(records) {

    const today =
        getToday();


    const start =
        new Date(today);


    start.setDate(
        today.getDate() - 6
    );


    return records.filter(
        function(record) {

            return (
                record.date >= start &&
                record.date <= today
            );

        }
    );

}


// =====================================
// MONTHLY RECORDS
// =====================================

function getMonthlyRecords(records) {

    const today =
        getToday();


    const year =
        today.getFullYear();


    const month =
        today.getMonth();


    return records.filter(
        function(record) {

            return (
                record.date.getFullYear() ===
                year &&
                record.date.getMonth() ===
                month
            );

        }
    );

}


// =====================================
// AVERAGE
// =====================================

function calculateAverage(values) {

    if (
        values.length === 0
    ) {

        return 0;

    }


    const total =
        values.reduce(
            function(sum, value) {

                return (
                    sum + value
                );

            },
            0
        );


    return Math.round(
        total /
        values.length
    );

}


// =====================================
// WEEKLY AVERAGE
// =====================================

function getWeeklyAverage(records) {

    const weekly =
        getWeeklyRecords(
            records
        );


    const values =
        weekly.map(
            function(record) {

                return getCompletionPercentage(
                    record.data
                );

            }
        );


    return calculateAverage(
        values
    );

}


// =====================================
// MONTHLY AVERAGE
// =====================================

function getMonthlyAverage(records) {

    const monthly =
        getMonthlyRecords(
            records
        );


    const values =
        monthly.map(
            function(record) {

                return getCompletionPercentage(
                    record.data
                );

            }
        );


    return calculateAverage(
        values
    );

}


// =====================================
// OVERALL AVERAGE
// =====================================

function getOverallAverage(records) {

    const values =
        records.map(
            function(record) {

                return getCompletionPercentage(
                    record.data
                );

            }
        );


    return calculateAverage(
        values
    );

}


// =====================================
// GET GOAL
// =====================================

function getWorkoutGoal() {

    const user =
        getCurrentUser();


    // User-specific goal if available

    const userGoal =
        localStorage.getItem(
            user + "_workoutGoal"
        );


    if (userGoal) {
        return userGoal;
    }


    // Existing global key

    const goal =
        localStorage.getItem(
            "workoutGoal"
        );


    if (goal) {
        return goal;
    }


    return "Not Selected";

}


// =====================================
// GOAL TEXT
// =====================================

function getGoalText(goal) {

    if (
        goal === "fatLoss"
    ) {

        return "🔥 Fat Loss";

    }


    if (
        goal === "muscleGain"
    ) {

        return "💪 Muscle Gain";

    }


    return "⚪ Not Selected";

}


// =====================================
// CREATE CANVAS
// =====================================

function createCanvas(
    canvasId,
    width,
    height
) {

    const canvas =
        document.getElementById(
            canvasId
        );


    if (!canvas) {
        return null;
    }


    const container =
        canvas.parentElement;


    const rect =
        container.getBoundingClientRect();


    const ratio =
        window.devicePixelRatio ||
        1;


    canvas.width =
        rect.width * ratio;


    canvas.height =
        height * ratio;


    canvas.style.width =
        rect.width + "px";


    canvas.style.height =
        height + "px";


    const ctx =
        canvas.getContext("2d");


    ctx.scale(
        ratio,
        ratio
    );


    return {

        canvas:
            canvas,

        ctx:
            ctx,

        width:
            rect.width,

        height:
            height

    };

}


// =====================================
// DRAW LINE CHART
// =====================================

function drawLineChart(
    canvasId,
    labels,
    values
) {

    const chart =
        createCanvas(
            canvasId,
            null,
            300
        );


    if (!chart) {
        return;
    }


    const ctx =
        chart.ctx;


    const width =
        chart.width;


    const height =
        chart.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const padding =
        45;


    const chartWidth =
        width - padding * 2;


    const chartHeight =
        height - 70;


    // =================================
    // GRID
    // =================================

    ctx.strokeStyle =
        "#dddddd";

    ctx.lineWidth =
        1;


    for (
        let i = 0;
        i <= 5;
        i++
    ) {

        const y =
            20 +
            (
                chartHeight *
                i /
                5
            );


        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.stroke();


        ctx.fillStyle =
            "#777";

        ctx.font =
            "12px Arial";

        ctx.fillText(
            `${100 - i * 20}%`,
            5,
            y + 4
        );

    }


    // =================================
    // LINE
    // =================================

    if (
        values.length === 0
    ) {

        return;

    }


    ctx.strokeStyle =
        "#3867e8";

    ctx.lineWidth =
        3;

    ctx.beginPath();


    values.forEach(
        function(value, index) {

            const x =
                padding +
                (
                    values.length === 1
                        ? chartWidth / 2
                        : chartWidth *
                        index /
                        (values.length - 1)
                );


            const y =
                20 +
                chartHeight -
                (
                    value /
                    100 *
                    chartHeight
                );


            if (
                index === 0
            ) {

                ctx.moveTo(
                    x,
                    y
                );

            } else {

                ctx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    ctx.stroke();


    // =================================
    // POINTS
    // =================================

    values.forEach(
        function(value, index) {

            const x =
                padding +
                (
                    values.length === 1
                        ? chartWidth / 2
                        : chartWidth *
                        index /
                        (values.length - 1)
                );


            const y =
                20 +
                chartHeight -
                (
                    value /
                    100 *
                    chartHeight
                );


            ctx.fillStyle =
                "#3867e8";


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.fillStyle =
                "#333";

            ctx.font =
                "12px Arial";


            ctx.textAlign =
                "center";


            ctx.fillText(
                labels[index],
                x,
                height - 15
            );

        }
    );

}


// =====================================
// DRAW BAR CHART
// =====================================

function drawBarChart(
    canvasId,
    labels,
    values
) {

    const chart =
        createCanvas(
            canvasId,
            null,
            300
        );


    if (!chart) {
        return;
    }


    const ctx =
        chart.ctx;


    const width =
        chart.width;


    const height =
        chart.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    if (
        values.length === 0
    ) {

        return;

    }


    const padding =
        45;


    const chartWidth =
        width - padding * 2;


    const chartHeight =
        height - 70;


    const barWidth =
        chartWidth /
        values.length *
        0.55;


    values.forEach(
        function(value, index) {

            const slot =
                chartWidth /
                values.length;


            const x =
                padding +
                slot * index +
                (
                    slot -
                    barWidth
                ) / 2;


            const barHeight =
                value /
                100 *
                chartHeight;


            const y =
                20 +
                chartHeight -
                barHeight;


            ctx.fillStyle =
                "#3867e8";


            ctx.fillRect(
                x,
                y,
                barWidth,
                barHeight
            );


            ctx.fillStyle =
                "#333";

            ctx.font =
                "12px Arial";

            ctx.textAlign =
                "center";


            ctx.fillText(
                `${value}%`,
                x +
                barWidth / 2,
                y - 7
            );


            ctx.fillText(
                labels[index],
                x +
                barWidth / 2,
                height - 15
            );

        }
    );

}


// =====================================
// WEEKLY CHART
// =====================================

function createWeeklyChart(records) {

    const weekly =
        getWeeklyRecords(
            records
        );


    const labels =
        weekly.map(
            function(record) {

                return (
                    record.date
                        .toLocaleDateString(
                            "en-IN",
                            {
                                weekday:
                                    "short"
                            }
                        )
                );

            }
        );


    const values =
        weekly.map(
            function(record) {

                return getCompletionPercentage(
                    record.data
                );

            }
        );


    drawLineChart(
        "weeklyChart",
        labels,
        values
    );

}


// =====================================
// MONTHLY CHART
// =====================================

function createMonthlyChart(records) {

    const monthly =
        getMonthlyRecords(
            records
        );


    const labels =
        monthly.map(
            function(record) {

                return String(
                    record.date.getDate()
                );

            }
        );


    const values =
        monthly.map(
            function(record) {

                return getCompletionPercentage(
                    record.data
                );

            }
        );


    drawLineChart(
        "monthlyChart",
        labels,
        values
    );

}


// =====================================
// WORKOUT CHART
// =====================================

function createWorkoutChart(records) {

    const workoutRecords =
        records.filter(
            function(record) {

                return (
                    record.workout !== null
                );

            }
        );


    const lastSeven =
        workoutRecords.slice(
            -7
        );


    const labels =
        lastSeven.map(
            function(record) {

                return String(
                    record.date.getDate()
                );

            }
        );


    const values =
        lastSeven.map(
            function(record) {

                return getWorkoutPercentage(
                    record.workout
                );

            }
        );


    drawBarChart(
        "workoutChart",
        labels,
        values
    );

}


// =====================================
// HABIT ANALYSIS
// =====================================

function calculateHabitAnalysis(records) {

    const habitStats =
        {};


    records.forEach(
        function(record) {

            const data =
                record.data;


            if (
                !data ||
                typeof data !==
                "object"
            ) {

                return;

            }


            Object.keys(data).forEach(
                function(key) {

                    // Ignore progress metadata

                    if (
                        key.includes(
                            "Progress"
                        ) ||
                        key.includes(
                            "progress"
                        ) ||
                        key.includes(
                            "Percentage"
                        ) ||
                        key.includes(
                            "percentage"
                        ) ||
                        key.includes(
                            "Completed"
                        ) ||
                        key.includes(
                            "completed"
                        )
                    ) {

                        return;

                    }


                    const value =
                        data[key];


                    if (
                        typeof value !==
                        "boolean"
                    ) {

                        return;

                    }


                    if (
                        !habitStats[key]
                    ) {

                        habitStats[key] = {

                            completed:
                                0,

                            total:
                                0

                        };

                    }


                    habitStats[key].total++;


                    if (
                        value === true
                    ) {

                        habitStats[key].completed++;

                    }

                }
            );

        }
    );


    return habitStats;

}


// =====================================
// DISPLAY HABIT ANALYSIS
// =====================================

function displayHabitAnalysis(
    records
) {

    const container =
        document.getElementById(
            "habitAnalysis"
        );


    if (!container) {
        return;
    }


    const stats =
        calculateHabitAnalysis(
            records
        );


    const keys =
        Object.keys(
            stats
        );


    if (
        keys.length === 0
    ) {

        container.innerHTML =
            `<div class="no-data">
                No habit data available.
            </div>`;

        return;

    }


    keys.sort(
        function(a, b) {

            const aPercent =
                stats[a].completed /
                stats[a].total;


            const bPercent =
                stats[b].completed /
                stats[b].total;


            return (
                bPercent -
                aPercent
            );

        }
    );


    let html = "";


    keys.forEach(
        function(key) {

            const stat =
                stats[key];


            const percentage =
                Math.round(
                    (
                        stat.completed /
                        stat.total
                    ) * 100
                );


            html += `

                <div class="habit-row">

                    <div class="habit-name">
                        ${formatHabitName(key)}
                    </div>

                    <div class="habit-bar">

                        <div
                            class="habit-bar-fill"
                            style="width:${percentage}%"
                        ></div>

                    </div>

                    <div class="habit-percent">
                        ${percentage}%
                    </div>

                </div>

            `;

        }
    );


    container.innerHTML =
        html;

}


// =====================================
// FORMAT HABIT NAME
// =====================================

function formatHabitName(name) {

    return name
        .replace(
            /([A-Z])/g,
            " $1"
        )
        .replace(
            /^./,
            function(char) {

                return char.toUpperCase();

            }
        );

}


// =====================================
// UPDATE SUMMARY
// =====================================

function updateSummary(records) {

    const today =
        calculateToday(
            records
        );


    const weekly =
        getWeeklyAverage(
            records
        );


    const monthly =
        getMonthlyAverage(
            records
        );


    const overall =
        getOverallAverage(
            records
        );


    const todayElement =
        document.getElementById(
            "todayAnalytics"
        );


    if (todayElement) {

        todayElement.textContent =
            `${today.percentage}%`;

    }


    const weeklyElement =
        document.getElementById(
            "weeklyAnalytics"
        );


    if (weeklyElement) {

        weeklyElement.textContent =
            `${weekly}%`;

    }


    const monthlyElement =
        document.getElementById(
            "monthlyAnalytics"
        );


    if (monthlyElement) {

        monthlyElement.textContent =
            `${monthly}%`;

    }


    const overallElement =
        document.getElementById(
            "overallAnalytics"
        );


    if (overallElement) {

        overallElement.textContent =
            `${overall}%`;

    }

}


// =====================================
// GOAL ANALYSIS
// =====================================

function displayGoalAnalysis() {

    const goal =
        getWorkoutGoal();


    const element =
        document.getElementById(
            "goalAnalysis"
        );


    if (!element) {
        return;
    }


    element.textContent =
        getGoalText(
            goal
        );

}


// =====================================
// DEBUG INFORMATION
// =====================================

function showAnalyticsConsole(
    records
) {

    console.log(
        "================================="
    );

    console.log(
        "CHAMPION ANALYTICS"
    );

    console.log(
        "User:",
        getCurrentUser()
    );

    console.log(
        "Goal:",
        getWorkoutGoal()
    );

    console.log(
        "Records:",
        records.length
    );

    console.log(
        "Weekly Average:",
        getWeeklyAverage(records) + "%"
    );

    console.log(
        "Monthly Average:",
        getMonthlyAverage(records) + "%"
    );

    console.log(
        "Overall Average:",
        getOverallAverage(records) + "%"
    );

    console.log(
        "================================="
    );

}


// =====================================
// INITIALIZE ANALYTICS
// =====================================

function loadAnalytics() {

    console.log(
        "📊 Loading Analytics..."
    );


    const records =
        getAllRecords();


    // =================================
    // SUMMARY
    // =================================

    updateSummary(
        records
    );


    // =================================
    // GOAL
    // =================================

    displayGoalAnalysis();


    // =================================
    // HABITS
    // =================================

    displayHabitAnalysis(
        records
    );


    // =================================
    // WEEKLY
    // =================================

    createWeeklyChart(
        records
    );


    // =================================
    // MONTHLY
    // =================================

    createMonthlyChart(
        records
    );


    // =================================
    // WORKOUT
    // =================================

    createWorkoutChart(
        records
    );


    // =================================
    // DEBUG
    // =================================

    showAnalyticsConsole(
        records
    );

}


// =====================================
// PAGE LOAD
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadAnalytics();

    }
);


// =====================================
// RESIZE
// =====================================

window.addEventListener(
    "resize",
    function() {

        loadAnalytics();

    }
);
