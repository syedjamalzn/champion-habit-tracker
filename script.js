// =====================================
// CHAMPION HABIT TRACKER v1.3
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

        totalProgress +=
            percentage;

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

    let average =
        Math.round(
            totalProgress / 7
        );

    weeklyAverage.innerHTML =
        `📊 Weekly Average : ${average}%`;
}


// =====================================
// MONTHLY REPORT
// =====================================

function loadMonthlyReport() {

    let user =
        localStorage.getItem("user");

    if (!user) {
        return;
    }

    let monthSelector =
        document.getElementById(
            "monthSelector"
        );

    let monthlyDays =
        document.getElementById(
            "monthlyDays"
        );

    let monthlyAverage =
        document.getElementById(
            "monthlyAverage"
        );

    if (
        !monthSelector ||
        !monthlyDays ||
        !monthlyAverage
    ) {
        return;
    }


    // =====================================
    // MONTH NAMES
    // =====================================

    let monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    // =====================================
    // TODAY
    // =====================================

    let today =
        new Date();

    let currentYear =
        today.getFullYear();

    let currentMonth =
        today.getMonth() + 1;

    let currentDay =
        today.getDate();


    // =====================================
    // CREATE JANUARY → DECEMBER DROPDOWN
    // =====================================

    monthSelector.innerHTML = "";

    for (
        let month = 1;
        month <= 12;
        month++
    ) {

        let option =
            document.createElement(
                "option"
            );

        let monthNumber =
            String(month)
                .padStart(2, "0");

        option.value =
            `${currentYear}-${monthNumber}`;

        option.textContent =
            `${monthNames[month - 1]} ${currentYear}`;

        monthSelector.appendChild(
            option
        );

    }


    // =====================================
    // DEFAULT = CURRENT MONTH
    // =====================================

    monthSelector.value =
        `${currentYear}-${String(currentMonth).padStart(2, "0")}`;


    // =====================================
    // DISPLAY SELECTED MONTH
    // =====================================

    function displaySelectedMonth() {

        let selectedMonth =
            monthSelector.value;

        if (!selectedMonth) {
            return;
        }


        // =================================
        // GET YEAR + MONTH
        // =================================

        let parts =
            selectedMonth.split("-");

        let year =
            Number(parts[0]);

        let month =
            Number(parts[1]);


        // =================================
        // CLEAR OLD DATA
        // =================================

        monthlyDays.innerHTML = "";

        monthlyAverage.innerHTML =
            "📊 Monthly Average : 0%";


        // =================================
        // FUTURE MONTH
        // =================================

        if (
            year > currentYear ||
            (
                year === currentYear &&
                month > currentMonth
            )
        ) {

            monthlyDays.innerHTML = `

                <div class="history-card">

                    <h3>
                        📭 No Report Found
                    </h3>

                    <p>
                        ${monthNames[month - 1]}
                        ${year}
                        is not available yet.
                    </p>

                </div>

            `;

            return;
        }


        // =================================
        // NUMBER OF DAYS TO SHOW
        // =================================

        let daysInMonth =
            new Date(
                year,
                month,
                0
            ).getDate();

        let lastDayToShow =
            daysInMonth;


        // =================================
        // CURRENT MONTH
        // SHOW ONLY UNTIL TODAY
        // =================================

        if (
            year === currentYear &&
            month === currentMonth
        ) {

            lastDayToShow =
                currentDay;

        }


        // =================================
        // TRACK AVERAGE
        // =================================

        let totalProgress = 0;

        let trackedDays = 0;


        // =================================
        // DAY NAMES
        // =================================

        let dayNames = [

            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"

        ];


        // =================================
        // DISPLAY DAYS
        // =================================

        for (
            let day = 1;
            day <= lastDayToShow;
            day++
        ) {

            let monthNumber =
                String(month)
                    .padStart(2, "0");

            let dateNumber =
                String(day)
                    .padStart(2, "0");


            // =================================
            // REPORT KEY
            // =================================

            let reportKey =
                `${user}_${year}_${monthNumber}_${dateNumber}`;


            let savedReport =
                localStorage.getItem(
                    reportKey
                );


            let percentage = 0;

            let completed = 0;

            let hasReport = false;


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

                    completed =
                        result.completed;

                    hasReport = true;


                } catch (error) {

                    console.log(
                        "Invalid report:",
                        reportKey
                    );

                }

            }


            // =================================
            // MONTHLY AVERAGE
            // ONLY SAVED REPORT DAYS
            // =================================

            if (hasReport) {

                totalProgress +=
                    percentage;

                trackedDays++;

            }


            // =================================
            // GET DAY NAME
            // =================================

            let currentDate =
                new Date(
                    year,
                    month - 1,
                    day
                );


            let dayName =
                dayNames[
                    currentDate.getDay()
                ];


            // =================================
            // STATUS
            // =================================

            let statusText;

            if (hasReport) {

                statusText =
                    `Completed : ${completed} / ${totalHabits}`;

            } else {

                statusText =
                    "📭 No Report Saved";

            }


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
                    📅
                    ${String(day).padStart(2, "0")}
                    ${monthNames[month - 1]}
                    ${year}
                </h3>

                <p>
                    ${dayName}
                </p>

                <p>
                    ${statusText}
                </p>

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


            monthlyDays.appendChild(
                dayCard
            );

        }


        // =================================
        // NO REPORT FOUND FOR THIS MONTH
        // =================================

        if (trackedDays === 0) {

            monthlyDays.innerHTML = `

                <div class="history-card">

                    <h3>
                        📭 No Report Found
                    </h3>

                    <p>
                        No saved reports for
                        ${monthNames[month - 1]}
                        ${year}.
                    </p>

                </div>

            `;

            monthlyAverage.innerHTML =
                "📊 Monthly Average : 0%";

            return;

        }


        // =================================
        // MONTHLY AVERAGE
        // =================================

        let average =
            Math.round(
                totalProgress /
                trackedDays
            );


        monthlyAverage.innerHTML =
            `📊 Monthly Average : ${average}%`;

    }


    // =====================================
    // DROPDOWN CHANGE
    // =====================================

    monthSelector.onchange =
        displaySelectedMonth;


    // =====================================
    // SHOW CURRENT MONTH
    // =====================================

    displaySelectedMonth();

}

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


                completed =
                    result.completed;


                hasReport = true;


                totalProgress +=
                    percentage;


                reportCount++;


            } catch (error) {

                console.log(
                    "Invalid report:",
                    reportKey
                );

            }

        }


        // =================================
        // GET DAY NAME
        // =================================

        let currentDate =
            new Date(
                currentYear,
                selectedMonthNumber,
                day
            );


        let dayName =
            dayNames[
                currentDate.getDay()
            ];


        // =================================
        // CREATE CARD
        // =================================

        let dayCard =
            document.createElement(
                "div"
            );


        dayCard.className =
            "history-card";


        if (hasReport) {

            dayCard.innerHTML = `

                <h3>
                    📅
                    ${String(day).padStart(2, "0")}
                    ${monthNames[selectedMonthNumber]}
                    ${currentYear}
                </h3>

                <p>
                    ${dayName}
                </p>

                <p>
                    Completed :
                    <strong>
                        ${completed} / ${totalHabits}
                    </strong>
                </p>

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

        } else {

            dayCard.innerHTML = `

                <h3>
                    📅
                    ${String(day).padStart(2, "0")}
                    ${monthNames[selectedMonthNumber]}
                    ${currentYear}
                </h3>

                <p>
                    ${dayName}
                </p>

                <p>
                    📭 No Report Saved
                </p>

                <p>
                    Progress :
                    <strong>
                        0%
                    </strong>
                </p>

                <progress
                    value="0"
                    max="100">
                </progress>

            `;

        }


        monthlyDays.appendChild(
            dayCard
        );

    }


    // =================================
    // NO REPORTS IN SELECTED MONTH
    // =================================

    if (
        reportCount === 0
    ) {

        monthlyDays.innerHTML = `

            <div class="history-card">

                <h3>
                    📭 No Report Found
                </h3>

                <p>
                    No reports saved for
                    ${monthNames[selectedMonthNumber]}
                    ${currentYear}.
                </p>

            </div>

        `;

        monthlyAverage.innerHTML =
            `📊 Monthly Average : 0%`;

        return;

    }


    // =================================
    // MONTHLY AVERAGE
    // =================================

    let average =
        Math.round(
            totalProgress /
            reportCount
        );


    monthlyAverage.innerHTML =
        `📊 Monthly Average : ${average}%`;

}
    // =================================
    // NO REPORTS
    // =================================

    if (
        availableMonths.length === 0
    ) {

        monthSelector.innerHTML =
            `<option value="">No reports yet</option>`;

        monthlyDays.innerHTML = "";

        monthlyAverage.innerHTML =
            "📊 Monthly Average : 0%";

        return;
    }

    // =================================
    // SORT LATEST MONTH FIRST
    // =================================

    availableMonths.sort(function(a, b) {

        return b.localeCompare(a);

    });

    // =================================
    // CREATE MONTH DROPDOWN
    // =================================

    monthSelector.innerHTML = "";

    let monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];

    availableMonths.forEach(function(
        monthKey
    ) {

        let parts =
            monthKey.split("-");

        let year =
            parts[0];

        let month =
            Number(parts[1]);

        let option =
            document.createElement(
                "option"
            );

        option.value =
            monthKey;

        option.textContent =
            `${monthNames[month - 1]} ${year}`;

        monthSelector.appendChild(
            option
        );

    });

    // =================================
    // DISPLAY SELECTED MONTH
    // =================================

    function displaySelectedMonth() {

        let selectedMonth =
            monthSelector.value;

        if (!selectedMonth) {
            return;
        }

        let parts =
            selectedMonth.split("-");

        let year =
            Number(parts[0]);

        let month =
            Number(parts[1]);

        let daysInMonth =
            new Date(
                year,
                month,
                0
            ).getDate();

        monthlyDays.innerHTML = "";

        let totalProgress = 0;

        let trackedDays = 0;

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            let monthNumber =
                String(month)
                    .padStart(2, "0");

            let dateNumber =
                String(day)
                    .padStart(2, "0");

            let reportKey =
                `${user}_${year}_${monthNumber}_${dateNumber}`;

            let savedReport =
                localStorage.getItem(
                    reportKey
                );

            let percentage = 0;

            let completed = 0;

            let hasReport = false;

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

                    completed =
                        result.completed;

                    hasReport = true;

                } catch (error) {

                    console.log(
                        "Invalid report:",
                        reportKey
                    );

                }

            }

            // Only saved days are included
            // in monthly average.

            if (hasReport) {

                totalProgress +=
                    percentage;

                trackedDays++;

            }

            let currentDate =
                new Date(
                    year,
                    month - 1,
                    day
                );

            let dayNames = [

                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"

            ];

            let dayName =
                dayNames[
                    currentDate.getDay()
                ];

            let dayCard =
                document.createElement(
                    "div"
                );

            dayCard.className =
                "history-card";

            let statusText =
                hasReport
                    ? `Completed : ${completed} / ${totalHabits}`
                    : "No Report Saved";

            dayCard.innerHTML = `

                <h3>
                    📅 ${String(day).padStart(2, "0")}
                    ${monthNames[month - 1]}
                    ${year}
                </h3>

                <p>
                    ${dayName}
                </p>

                <p>
                    ${statusText}
                </p>

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

            monthlyDays.appendChild(
                dayCard
            );

        }

        // =================================
        // MONTHLY AVERAGE
        // =================================

        let average = 0;

        if (trackedDays > 0) {

            average =
                Math.round(
                    totalProgress /
                    trackedDays
                );

        }

        monthlyAverage.innerHTML =
            `📊 Monthly Average : ${average}%`;

    }

    // =================================
    // CHANGE MONTH
    // =================================

    monthSelector.onchange =
        displaySelectedMonth;

    // =================================
    // SHOW FIRST MONTH
    // =================================

    displaySelectedMonth();
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

    loadMonthlyReport();


    // =================================
    // MONTH DROPDOWN CHANGE
    // =================================

    let monthSelector =
        document.getElementById(
            "monthSelector"
        );


    if (monthSelector) {

        monthSelector.addEventListener(
            "change",
            function () {

                loadMonthlyReport(
                    this.value
                );

            }
        );

    }

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
