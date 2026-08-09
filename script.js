// =====================================
// CHAMPION HABIT TRACKER v1.5
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

        try {

            let report =
                JSON.parse(
                    savedReport
                );


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


        } catch (error) {

            console.log(
                "Invalid report:",
                reportKey
            );

        }

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
            !key ||
            !key.startsWith(
                user + "_"
            )
        ) {

            continue;

        }


        if (
            key ===
            `${user}_report`
        ) {

            continue;

        }


        let parts =
            key.split("_");


        if (parts.length !== 4) {

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
    // NO REPORTS
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


    // =================================
    // TODAY
    // =================================

    let today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    // =================================
    // CURRENT WEEK MONDAY
    // =================================

    let todayDay =
        today.getDay();


    let currentMonday =
        new Date(today);


    let difference =
        todayDay === 0
            ? -6
            : 1 - todayDay;


    currentMonday.setDate(
        today.getDate() + difference
    );


    currentMonday.setHours(
        0,
        0,
        0,
        0
    );


    // =================================
    // WEEK OFFSET
    // =================================

    let weekOffset = 0;


    // =================================
    // WEEK BUTTONS
    // =================================

    let previousButton =
        document.getElementById(
            "previousWeek"
        );


    let nextButton =
        document.getElementById(
            "nextWeek"
        );


    let weekTitle =
        document.getElementById(
            "weekTitle"
        );


    // =================================
    // DISPLAY WEEK
    // =================================

    function displayWeek() {

        weeklyDays.innerHTML = "";


        let monday =
            new Date(
                currentMonday
            );


        monday.setDate(
            currentMonday.getDate() +
            (weekOffset * 7)
        );


        let sunday =
            new Date(
                monday
            );


        sunday.setDate(
            monday.getDate() + 6
        );


        // =================================
        // WEEK TITLE
        // =================================

        let mondayDate =
            String(
                monday.getDate()
            ).padStart(2, "0");


        let mondayMonth =
            String(
                monday.getMonth() + 1
            ).padStart(2, "0");


        let mondayYear =
            monday.getFullYear();


        let sundayDate =
            String(
                sunday.getDate()
            ).padStart(2, "0");


        let sundayMonth =
            String(
                sunday.getMonth() + 1
            ).padStart(2, "0");


        let sundayYear =
            sunday.getFullYear();


        if (weekTitle) {

            weekTitle.innerHTML =
                `📅 ${mondayDate}/${mondayMonth}/${mondayYear}
                - ${sundayDate}/${sundayMonth}/${sundayYear}`;

        }


        // =================================
        // NEXT BUTTON
        // =================================

        if (nextButton) {

            nextButton.disabled =
                weekOffset >= 0;

        }


        // =================================
        // PREVIOUS BUTTON
        // =================================

        if (previousButton) {

            previousButton.disabled =
                false;

        }


        let dayNames = [

            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"

        ];


        let totalProgress = 0;

        let trackedDays = 0;


        // =================================
        // 7 DAYS
        // =================================

        for (
            let i = 0;
            i < 7;
            i++
        ) {

            let currentDate =
                new Date(
                    monday
                );


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


            let isFuture =
                currentDate > today;


            let percentage = 0;

            let completed = 0;

            let hasReport = false;


            // =================================
            // LOAD REPORT
            // =================================

            if (!isFuture) {

                let reportKey =
                    `${user}_${year}_${month}_${date}`;


                let savedReport =
                    localStorage.getItem(
                        reportKey
                    );


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


                        trackedDays++;


                    } catch (error) {

                        console.log(
                            "Invalid report:",
                            reportKey
                        );

                    }

                }

            }


            // =================================
            // DAY CARD
            // =================================

            let dayCard =
                document.createElement(
                    "div"
                );


            dayCard.className =
                "history-card";


            if (isFuture) {

                dayCard.innerHTML = `

                    <h3>
                        ${dayNames[i]}
                    </h3>

                    <p>
                        📅 ${date}/${month}/${year}
                    </p>

                    <p>
                        ⏳ Not Available Yet
                    </p>

                `;

            }


            else if (hasReport) {

                dayCard.innerHTML = `

                    <h3>
                        ${dayNames[i]}
                    </h3>

                    <p>
                        📅 ${date}/${month}/${year}
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

            }


            else {

                dayCard.innerHTML = `

                    <h3>
                        ${dayNames[i]}
                    </h3>

                    <p>
                        📅 ${date}/${month}/${year}
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


            weeklyDays.appendChild(
                dayCard
            );

        }


        // =================================
        // WEEKLY AVERAGE
        // =================================

        let average = 0;


        if (trackedDays > 0) {

            average =
                Math.round(
                    totalProgress /
                    trackedDays
                );

        }


        weeklyAverage.innerHTML =
            `📊 Weekly Average : ${average}%`;

    }


    // =================================
    // PREVIOUS WEEK
    // =================================

    if (previousButton) {

        previousButton.onclick =
            function() {

                weekOffset--;

                displayWeek();

            };

    }


    // =================================
    // NEXT WEEK
    // =================================

    if (nextButton) {

        nextButton.onclick =
            function() {

                if (weekOffset < 0) {

                    weekOffset++;

                    displayWeek();

                }

            };

    }


    // =================================
    // FIRST LOAD
    // =================================

    displayWeek();

}


// =====================================
// MONTHLY REPORT
// CALENDAR VERSION
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


    let monthlyCalendar =
        document.getElementById(
            "monthlyCalendar"
        );


    let monthlyAverage =
        document.getElementById(
            "monthlyAverage"
        );


    let selectedDateReport =
        document.getElementById(
            "selectedDateReport"
        );


    if (
        !monthSelector ||
        !monthlyCalendar ||
        !monthlyAverage ||
        !selectedDateReport
    ) {

        return;

    }


    // =================================
    // MONTH NAMES
    // =================================

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


    // =================================
    // TODAY
    // =================================

    let today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    let currentYear =
        today.getFullYear();


    let currentMonth =
        today.getMonth() + 1;


    let currentDay =
        today.getDate();


    // =================================
    // CREATE MONTH SELECTOR
    // =================================

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


    // =================================
    // CURRENT MONTH
    // =================================

    monthSelector.value =
        `${currentYear}-${String(currentMonth).padStart(2, "0")}`;


    // =================================
    // DISPLAY SELECTED DATE REPORT
    // =================================

    function showDateReport(
        year,
        month,
        day
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


        if (!savedReport) {

            selectedDateReport.innerHTML = `

                <div class="selected-date-card">

                    <h3>
                        📅
                        ${String(day).padStart(2, "0")}
                        ${monthNames[month - 1]}
                        ${year}
                    </h3>

                    <p>
                        📭 No Report Saved
                    </p>

                    <p>
                        Progress :
                        <strong>0%</strong>
                    </p>

                </div>

            `;

            return;

        }


        try {

            let report =
                JSON.parse(
                    savedReport
                );


            let result =
                calculateProgress(
                    report
                );


            selectedDateReport.innerHTML = `

                <div class="selected-date-card">

                    <h3>
                        📅
                        ${String(day).padStart(2, "0")}
                        ${monthNames[month - 1]}
                        ${year}
                    </h3>

                    <p>
                        Completed :
                        <strong>
                            ${result.completed} / ${totalHabits}
                        </strong>
                    </p>

                    <p>
                        Progress :
                        <strong>
                            ${result.percentage}%
                        </strong>
                    </p>

                    <progress
                        value="${result.percentage}"
                        max="100">
                    </progress>

                </div>

            `;


        } catch (error) {

            selectedDateReport.innerHTML = `

                <div class="selected-date-card">

                    <p>
                        ⚠️ Invalid report data.
                    </p>

                </div>

            `;

        }

    }


    // =================================
    // DISPLAY CALENDAR
    // =================================

    function displayCalendar() {

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


        monthlyCalendar.innerHTML = "";


        // =================================
        // FIRST DAY OF MONTH
        // =================================

        let firstDate =
            new Date(
                year,
                month - 1,
                1
            );


        let firstDay =
            firstDate.getDay();


        // =================================
        // DAYS IN MONTH
        // =================================

        let daysInMonth =
            new Date(
                year,
                month,
                0
            ).getDate();


        // =================================
        // AVERAGE
        // =================================

        let totalProgress = 0;

        let reportCount = 0;


        // =================================
        // EMPTY CELLS BEFORE DAY 1
        // =================================

        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            let emptyDay =
                document.createElement(
                    "div"
                );


            emptyDay.className =
                "calendar-day empty";


            monthlyCalendar.appendChild(
                emptyDay
            );

        }


        // =================================
        // CREATE DAYS
        // =================================

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
            // CREATE CALENDAR DAY
            // =================================

            let dayCell =
                document.createElement(
                    "div"
                );


            dayCell.className =
                "calendar-day";


            // =================================
            // TODAY
            // =================================

            if (
                year === currentYear &&
                month === currentMonth &&
                day === currentDay
            ) {

                dayCell.classList.add(
                    "today"
                );

            }


            // =================================
            // REPORT STATUS
            // =================================

            if (hasReport) {

                dayCell.classList.add(
                    "has-report"
                );

            } else {

                dayCell.classList.add(
                    "no-report"
                );

            }


            // =================================
            // DAY CONTENT
            // =================================

            if (hasReport) {

                dayCell.innerHTML = `

                    <div class="calendar-date">
                        ${day}
                    </div>

                    <div class="calendar-progress">
                        ${percentage}%
                    </div>

                    <div class="calendar-dot">
                        ✅ Report
                    </div>

                `;

            } else {

                dayCell.innerHTML = `

                    <div class="calendar-date">
                        ${day}
                    </div>

                    <div class="calendar-progress">
                        0%
                    </div>

                    <div class="calendar-dot">
                        —
                    </div>

                `;

            }


            // =================================
            // DATE CLICK
            // =================================

            dayCell.addEventListener(
                "click",
                function() {

                    showDateReport(
                        year,
                        month,
                        day
                    );

                }
            );


            monthlyCalendar.appendChild(
                dayCell
            );

        }


        // =================================
        // MONTHLY AVERAGE
        // =================================

        let average = 0;


        if (reportCount > 0) {

            average =
                Math.round(
                    totalProgress /
                    reportCount
                );

        }


        monthlyAverage.innerHTML =
            `📊 Monthly Average : ${average}%`;


        // =================================
        // DEFAULT SELECTED DATE
        // =================================

        if (
            year === currentYear &&
            month === currentMonth
        ) {

            showDateReport(
                year,
                month,
                currentDay
            );

        } else {

            selectedDateReport.innerHTML = `

                <div class="selected-date-card">

                    <p>
                        👆 Select a date from
                        the calendar to view
                        the report.
                    </p>

                </div>

            `;

        }

    }


    // =================================
    // MONTH CHANGE
    // =================================

    monthSelector.onchange =
        function() {

            displayCalendar();

        };


    // =================================
    // FIRST LOAD
    // =================================

    displayCalendar();

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

        }

    }
);

    // =================================
    // DASHBOARD PAGE
    // =================================

    if (
        document.getElementById(
            "todayCompleted"
        )
    ) {

        loadDashboard();

    }

// =====================================
// DASHBOARD REPORT
// =====================================

function loadDashboard() {

    let user =
        localStorage.getItem("user");

    if (!user) {
        return;
    }


    // =================================
    // WELCOME USER
    // =================================

    let welcomeText =
        document.getElementById(
            "welcomeText"
        );

    if (welcomeText) {

        welcomeText.innerHTML =
            `Welcome ${user} 👋`;

    }


    // =================================
    // TODAY
    // =================================

    let today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    let todayYear =
        today.getFullYear();

    let todayMonth =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    let todayDate =
        String(
            today.getDate()
        ).padStart(2, "0");


    let todayKey =
        `${user}_${todayYear}_${todayMonth}_${todayDate}`;


    let todayReport =
        localStorage.getItem(
            todayKey
        );


    let todayCompleted = 0;

    let todayPercentage = 0;


    if (todayReport) {

        try {

            let report =
                JSON.parse(
                    todayReport
                );

            let result =
                calculateProgress(
                    report
                );

            todayCompleted =
                result.completed;

            todayPercentage =
                result.percentage;

        } catch (error) {

            console.log(
                "Invalid dashboard today report:",
                todayKey
            );

        }

    }


    // =================================
    // TODAY UI
    // =================================

    let todayCompletedText =
        document.getElementById(
            "todayCompleted"
        );

    let todayPercentageText =
        document.getElementById(
            "todayPercentage"
        );

    let todayProgressBar =
        document.getElementById(
            "todayProgressBar"
        );


    if (todayCompletedText) {

        todayCompletedText.innerHTML =
            `Completed : ${todayCompleted} / ${totalHabits}`;

    }


    if (todayPercentageText) {

        todayPercentageText.innerHTML =
            `Progress : ${todayPercentage}%`;

    }


    if (todayProgressBar) {

        todayProgressBar.value =
            todayPercentage;

    }


    // =================================
    // CURRENT WEEK
    // =================================

    let todayDay =
        today.getDay();

    let currentMonday =
        new Date(today);

    let difference =
        todayDay === 0
            ? -6
            : 1 - todayDay;


    currentMonday.setDate(
        today.getDate() + difference
    );

    currentMonday.setHours(
        0,
        0,
        0,
        0
    );


    let weeklyTotal =
        0;

    let weeklyTracked =
        0;


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        let currentDate =
            new Date(
                currentMonday
            );

        currentDate.setDate(
            currentMonday.getDate() + i
        );

        currentDate.setHours(
            0,
            0,
            0,
            0
        );


        // Don't count future days

        if (
            currentDate > today
        ) {

            continue;

        }


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

                weeklyTotal +=
                    result.percentage;

                weeklyTracked++;

            } catch (error) {

                console.log(
                    "Invalid weekly dashboard report:",
                    reportKey
                );

            }

        }

    }


    let weeklyAverage = 0;


    if (
        weeklyTracked > 0
    ) {

        weeklyAverage =
            Math.round(
                weeklyTotal /
                weeklyTracked
            );

    }


    // =================================
    // WEEKLY UI
    // =================================

    let dashboardWeeklyAverage =
        document.getElementById(
            "dashboardWeeklyAverage"
        );

    let dashboardWeeklyBar =
        document.getElementById(
            "dashboardWeeklyBar"
        );


    if (
        dashboardWeeklyAverage
    ) {

        dashboardWeeklyAverage.innerHTML =
            `Weekly Average : ${weeklyAverage}%`;

    }


    if (
        dashboardWeeklyBar
    ) {

        dashboardWeeklyBar.value =
            weeklyAverage;

    }


    // =================================
    // CURRENT MONTH
    // =================================

    let monthlyTotal =
        0;

    let monthlyTracked =
        0;


    let daysInMonth =
        new Date(
            todayYear,
            today.getMonth() + 1,
            0
        ).getDate();


    for (
        let day = 1;
        day <= today.getDate();
        day++
    ) {

        let month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        let date =
            String(day)
                .padStart(2, "0");


        let reportKey =
            `${user}_${todayYear}_${month}_${date}`;


        let savedReport =
            localStorage.getItem(
                reportKey
            );


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

                monthlyTotal +=
                    result.percentage;

                monthlyTracked++;

            } catch (error) {

                console.log(
                    "Invalid monthly dashboard report:",
                    reportKey
                );

            }

        }

    }


    let monthlyAverage = 0;


    if (
        monthlyTracked > 0
    ) {

        monthlyAverage =
            Math.round(
                monthlyTotal /
                monthlyTracked
            );

    }


    // =================================
    // MONTHLY UI
    // =================================

    let dashboardMonthlyAverage =
        document.getElementById(
            "dashboardMonthlyAverage"
        );

    let dashboardMonthlyBar =
        document.getElementById(
            "dashboardMonthlyBar"
        );


    if (
        dashboardMonthlyAverage
    ) {

        dashboardMonthlyAverage.innerHTML =
            `Monthly Average : ${monthlyAverage}%`;

    }


    if (
        dashboardMonthlyBar
    ) {

        dashboardMonthlyBar.value =
            monthlyAverage;

    }


    // =================================
    // OVERALL AVERAGE
    // =================================

    let overallTotal =
        0;

    let overallTracked =
        0;


    for (
        let i = 0;
        i < localStorage.length;
        i++
    ) {

        let key =
            localStorage.key(i);


        if (
            !key ||
            !key.startsWith(
                user + "_"
            )
        ) {

            continue;

        }


        let parts =
            key.split("_");


        // Only daily report keys

        if (
            parts.length !== 4
        ) {

            continue;

        }


        let savedReport =
            localStorage.getItem(
                key
            );


        try {

            let report =
                JSON.parse(
                    savedReport
                );

            let result =
                calculateProgress(
                    report
                );

            overallTotal +=
                result.percentage;

            overallTracked++;

        } catch (error) {

            console.log(
                "Invalid overall dashboard report:",
                key
            );

        }

    }


    let overallAverage =
        0;


    if (
        overallTracked > 0
    ) {

        overallAverage =
            Math.round(
                overallTotal /
                overallTracked
            );

    }


    // =================================
    // OVERALL UI
    // =================================

    let overallAverageText =
        document.getElementById(
            "overallAverage"
        );

    let overallProgressBar =
        document.getElementById(
            "overallProgressBar"
        );


    if (
        overallAverageText
    ) {

        overallAverageText.innerHTML =
            `Overall Average : ${overallAverage}%`;

    }


    if (
        overallProgressBar
    ) {

        overallProgressBar.value =
            overallAverage;

    }


    // =================================
    // CURRENT STREAK
    // =================================

    let streak = 0;


    for (;;) {

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


        let reportKey =
            `${user}_${year}_${month}_${date}`;


        let savedReport =
            localStorage.getItem(
                reportKey
            );


        if (!savedReport) {

            break;

        }


        try {

            JSON.parse(
                savedReport
            );

            streak++;

        } catch (error) {

            break;

        }


        today.setDate(
            today.getDate() - 1
        );

    }


    // =================================
    // STREAK UI
    // =================================

    let currentStreak =
        document.getElementById(
            "currentStreak"
        );


    if (currentStreak) {

        currentStreak.innerHTML =
            `${streak} Day${streak === 1 ? "" : "s"}`;

    }

}


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
