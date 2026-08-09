// =====================================
// CHAMPION HABIT TRACKER v1.1
// SCRIPT.JS
// =====================================


// =====================================
// HABIT LIST
// =====================================

const habitIds = [

    // MORNING
    "wakeUp",
    "water",
    "milk",
    "eggs",
    "breakfast",
    "protein",

    // GYM
    "warmUp",
    "workout",
    "correctForm",
    "stretching",

    // NUTRITION
    "lunch",
    "eveningSnack",
    "fruits",
    "dinner",
    "noJunkFood",

    // HYDRATION
    "hydration",

    // DAILY ACTIVITY
    "steps",
    "walking",

    // NIGHT
    "nightMilk",
    "sleepBefore",
    "sleepHours"
];


// Total number of habits
const totalHabits = habitIds.length;


// =====================================
// LOGIN PAGE
// =====================================

function welcomeUser() {

    let selectedUser =
        document.querySelector(
            'input[name="user"]:checked'
        );

    if (selectedUser) {

        localStorage.setItem(
            "user",
            selectedUser.value
        );

        window.location =
            "checklist.html";

    } else {

        alert(
            "Please select a profile."
        );

    }
}


// =====================================
// LOAD USER
// =====================================

function loadUser() {

    let user =
        localStorage.getItem("user");

    if (!user) {
        return;
    }

    let welcomeText =
        document.getElementById(
            "welcomeText"
        );

    if (welcomeText) {

        welcomeText.innerHTML =
            `Welcome ${user} 👋`;

    }

    let userName =
        document.getElementById(
            "userName"
        );

    if (userName) {

        userName.innerHTML =
            user;

    }

    loadTodayDate();
}


// =====================================
// LOAD TODAY DATE
// =====================================

function loadTodayDate() {

    let today =
        new Date();

    let year =
        today.getFullYear();

    let month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    let date =
        String(
            today.getDate()
        ).padStart(2, "0");

    let todayDate =
        document.getElementById(
            "todayDate"
        );

    if (todayDate) {

        todayDate.innerHTML =
            `${date} / ${month} / ${year}`;

    }
}


// =====================================
// GET TODAY REPORT KEY
// =====================================

function getTodayReportKey() {

    let user =
        localStorage.getItem("user");

    let today =
        new Date();

    let year =
        today.getFullYear();

    let month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    let date =
        String(
            today.getDate()
        ).padStart(2, "0");

    return `${user}_${year}_${month}_${date}`;
}


// =====================================
// SAVE REPORT
// =====================================

function saveReport() {

    let report = {};

    habitIds.forEach(function(id) {

        let checkbox =
            document.getElementById(id);

        if (checkbox) {

            report[id] =
                checkbox.checked;

        }

    });

    let reportKey =
        getTodayReportKey();

    localStorage.setItem(
        reportKey,
        JSON.stringify(report)
    );

    updateProgress();

    alert(
        "Report Saved Successfully ✅"
    );
}


// =====================================
// LOAD TODAY REPORT
// =====================================

function loadReport() {

    let reportKey =
        getTodayReportKey();

    let savedReport =
        localStorage.getItem(
            reportKey
        );

    if (savedReport) {

        let report =
            JSON.parse(savedReport);

        habitIds.forEach(function(id) {

            let checkbox =
                document.getElementById(id);

            if (
                checkbox &&
                report[id] !== undefined
            ) {

                checkbox.checked =
                    report[id];

            }

        });

    }

    updateProgress();
}


// =====================================
// CALCULATE PROGRESS
// =====================================

function calculateProgress(report) {

    let completed = 0;

    habitIds.forEach(function(id) {

        if (report[id] === true) {

            completed++;

        }

    });

    let percentage =
        Math.round(
            (completed / totalHabits) * 100
        );

    return {
        completed,
        percentage
    };
}


// =====================================
// UPDATE LIVE PROGRESS
// =====================================

function updateProgress() {

    let report = {};

    habitIds.forEach(function(id) {

        let checkbox =
            document.getElementById(id);

        if (checkbox) {

            report[id] =
                checkbox.checked;

        }

    });

    let result =
        calculateProgress(report);

    let completedText =
        document.getElementById(
            "completedText"
        );

    let percentageText =
        document.getElementById(
            "percentageText"
        );

    let progressBar =
        document.getElementById(
            "progressBar"
        );

    if (completedText) {

        completedText.innerHTML =
            `Completed : ${result.completed} / ${totalHabits}`;

    }

    if (percentageText) {

        percentageText.innerHTML =
            `Progress : ${result.percentage}%`;

    }

    if (progressBar) {

        progressBar.value =
            result.percentage;

    }
}


// =====================================
// LOAD HISTORY
// =====================================

function loadHistory() {

    let user =
        localStorage.getItem("user");

    if (!user) {
        return;
    }

    let welcomeText =
        document.getElementById(
            "welcomeText"
        );

    if (welcomeText) {

        welcomeText.innerHTML =
            `Welcome ${user} 👋`;

    }

    let historyList =
        document.getElementById(
            "historyList"
        );

    if (!historyList) {
        return;
    }

    historyList.innerHTML = "";

    let reports = [];


    // =================================
    // COLLECT USER REPORTS
    // =================================

    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        let key =
            localStorage.key(i);

        if (
            key &&
            key.startsWith(
                user + "_"
            )
        ) {

            // Ignore old _report key
            if (
                key ===
                `${user}_report`
            ) {

                continue;

            }

            let savedReport =
                localStorage.getItem(key);

            try {

                let report =
                    JSON.parse(
                        savedReport
                    );

                reports.push({
                    key,
                    report
                });

            } catch (error) {

                console.log(
                    "Invalid report:",
                    key
                );

            }

        }

    }


    // =================================
    // LATEST DATE FIRST
    // =================================

    reports.sort(function(a, b) {

        return b.key.localeCompare(
            a.key
        );

    });


    // =================================
    // DISPLAY HISTORY
    // =================================

    reports.forEach(function(item) {

        let key =
            item.key;

        let report =
            item.report;

        let result =
            calculateProgress(
                report
            );

        let parts =
            key.split("_");

        let year =
            parts[1];

        let month =
            parts[2];

        let date =
            parts[3];

        let months = [

            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"

        ];

        let monthName =
            months[
                Number(month) - 1
            ];

        let displayDate =
            `${date} ${monthName} ${year}`;

        let card =
            document.createElement(
                "div"
            );

        card.className =
            "history-card";

        card.innerHTML = `

            <h3>
                📅 ${displayDate}
            </h3>

            <p>
                Completed :
                ${result.completed}
                /
                ${totalHabits}
            </p>

            <p>
                Progress :
                ${result.percentage}%
            </p>

            <progress
                value="${result.percentage}"
                max="100">
            </progress>

        `;

        historyList.appendChild(
            card
        );

    });


    // =================================
    // NO HISTORY MESSAGE
    // =================================

    if (
        reports.length === 0
    ) {

        historyList.innerHTML = `

            <div class="history-card">

                <h3>
                    📭 No Reports Yet
                </h3>

                <p>
                    Save your first daily
                    report to see it here.
                </p>

            </div>

        `;

    }

}


// =====================================
// WEEKLY REPORT
// =====================================

function loadWeeklyReport() {

    let user =
        localStorage.getItem("user");

    if (!user) {
        return;
    }

    let weeklyDays =
        document.getElementById(
            "weeklyDays"
        );

    let weeklyAverage =
        document.getElementById(
            "weeklyAverage"
        );

    if (
        !weeklyDays ||
        !weeklyAverage
    ) {
        return;
    }

    weeklyDays.innerHTML = "";

    let today =
        new Date();

    let day =
        today.getDay();

    let monday =
        new Date(today);

    let difference =
        day === 0
            ? -6
            : 1 - day;

    monday.setDate(
        today.getDate() +
        difference
    );

    let totalProgress = 0;

    let dayNames = [

        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"

    ];


    // =================================
    // MONDAY → SUNDAY
    // =================================

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        let currentDate =
            new Date(monday);

        currentDate.setDate(
            monday.getDate() + i
        );

        let year =
            currentDate.getFullYear();

        let month =
            String(
                currentDate.getMonth() + 1
            ).padStart(2, "0");

        let date =
            String(
                currentDate.getDate()
            ).padStart(2, "0");

        let reportKey =
            `${user}_${year}_${month}_${date}`;

        let savedReport =
            localStorage.getItem(
                reportKey
            );

        let percentage = 0;


        // =================================
        // LOAD REPORT
        // =================================

        if (savedReport) {

            try {

                let report =
                    JSON.parse(
                        savedReport
                    );

                let result =
                    calculateProgress(
                        report
                    );

                percentage =
                    result.percentage;

            } catch (error) {

                console.log(
                    "Invalid report:",
                    reportKey
                );

            }

        }


        // =================================
        // ADD TO WEEKLY TOTAL
        // =================================

        totalProgress +=
            percentage;


        // =================================
        // CREATE DAY CARD
        // =================================

        let dayCard =
            document.createElement(
                "div"
            );

        dayCard.className =
            "history-card";

        dayCard.innerHTML = `

            <h3>
                ${dayNames[i]}
            </h3>

            <p>
                Progress :
                <strong>
                    ${percentage}%
                </strong>
            </p>

            <progress
                value="${percentage}"
                max="100">
            </progress>

        `;

        weeklyDays.appendChild(
            dayCard
        );

    }


    // =================================
    // WEEKLY AVERAGE
    // =================================

    let average =
        Math.round(
            totalProgress / 7
        );

    weeklyAverage.innerHTML =
        `📊 Weekly Average : ${average}%`;

}


// =====================================
// AUTO LOAD BASED ON PAGE
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // =================================
        // CHECKLIST PAGE
        // =================================

        if (
            document.getElementById(
                "welcomeText"
            ) &&
            document.getElementById(
                "completedText"
            )
        ) {

            loadUser();

            loadReport();

        }


        // =================================
        // HISTORY PAGE
        // =================================

        if (
            document.getElementById(
                "historyList"
            )
        ) {

            loadHistory();

            loadWeeklyReport();

        }

    }
);


// =====================================
// REGISTER SERVICE WORKER
// =====================================

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "service-worker.js"
                )
                .then(() => {

                    console.log(
                        "Service Worker Registered ✅"
                    );

                })
                .catch(error => {

                    console.log(
                        "Service Worker Error:",
                        error
                    );

                });

        }
    );

}
