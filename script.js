// =====================================
// CHAMPION HABIT TRACKER v1.6
// SCRIPT.JS
// PROFILE-SAFE VERSION
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


// =====================================
// TOTAL HABITS
// =====================================

const totalHabits =
    habitIds.length;


// =====================================
// GET CURRENT USER
// =====================================

function getCurrentUser() {

    return (
        localStorage.getItem("user") ||
        ""
    );

}


// =====================================
// GET TODAY DATE OBJECT
// =====================================

function getTodayDate() {

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
// GET DATE KEY
// =====================================

function getDateKey(date) {

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

    return `${year}_${month}_${day}`;

}


// =====================================
// GET USER DAILY REPORT KEY
// =====================================
//
// IMPORTANT
// Every profile gets its own key.
//
// Jamal_2026_08_10
// Gayathri_2026_08_10
// Vishnu Priya_2026_08_10
//
// =====================================

function getUserReportKey(
    user,
    date
) {

    if (!user) {
        return null;
    }

    return `${user}_${getDateKey(date)}`;

}


// =====================================
// GET TODAY REPORT KEY
// =====================================

function getTodayReportKey() {

    const user =
        getCurrentUser();

    const today =
        getTodayDate();

    return getUserReportKey(
        user,
        today
    );

}


// =====================================
// LOGIN PAGE
// =====================================

function welcomeUser() {

    const selectedUser =
        document.querySelector(
            'input[name="user"]:checked'
        );


    if (!selectedUser) {

        alert(
            "Please select a profile."
        );

        return;

    }


    const user =
        selectedUser.value;


    // =================================
    // SAVE CURRENT USER
    // =================================

    localStorage.setItem(
        "user",
        user
    );


    // =================================
    // OPTIONAL OLD KEY CLEANUP
    // =================================

    localStorage.removeItem(
        "currentUser"
    );

    localStorage.removeItem(
        "selectedUser"
    );


    // =================================
    // GO TO CHECKLIST
    // =================================

    window.location.href =
        "checklist.html";

}


// =====================================
// LOAD USER
// =====================================

function loadUser() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const welcomeText =
        document.getElementById(
            "welcomeText"
        );


    if (welcomeText) {

        welcomeText.innerHTML =
            `Welcome ${user} 👋`;

    }


    const userName =
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

    const today =
        getTodayDate();


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


    const todayDate =
        document.getElementById(
            "todayDate"
        );


    if (todayDate) {

        todayDate.innerHTML =
            `${date} / ${month} / ${year}`;

    }

}


// =====================================
// SAVE REPORT
// =====================================

function saveReport() {

    const user =
        getCurrentUser();


    if (!user) {

        alert(
            "No profile selected."
        );

        return;

    }


    const report = {};


    // =================================
    // READ ALL 21 HABITS
    // =================================

    habitIds.forEach(
        function(id) {

            const checkbox =
                document.getElementById(id);


            if (checkbox) {

                report[id] =
                    checkbox.checked;

            } else {

                report[id] =
                    false;

            }

        }
    );


    // =================================
    // USER-SPECIFIC TODAY KEY
    // =================================

    const reportKey =
        getTodayReportKey();


    if (!reportKey) {

        return;

    }


    // =================================
    // SAVE
    // =================================

    localStorage.setItem(
        reportKey,
        JSON.stringify(report)
    );


    // =================================
    // UPDATE UI
    // =================================

    updateProgress();


    alert(
        `${user}'s report saved successfully ✅`
    );

}


// =====================================
// LOAD TODAY REPORT
// =====================================

function loadReport() {

    const reportKey =
        getTodayReportKey();


    if (!reportKey) {

        return;

    }


    const savedReport =
        localStorage.getItem(
            reportKey
        );


    // =================================
    // CLEAR CHECKBOXES FIRST
    // =================================

    habitIds.forEach(
        function(id) {

            const checkbox =
                document.getElementById(id);


            if (checkbox) {

                checkbox.checked =
                    false;

            }

        }
    );


    // =================================
    // LOAD SAVED REPORT
    // =================================

    if (savedReport) {

        try {

            const report =
                JSON.parse(
                    savedReport
                );


            habitIds.forEach(
                function(id) {

                    const checkbox =
                        document.getElementById(id);


                    if (
                        checkbox &&
                        report[id] !== undefined
                    ) {

                        checkbox.checked =
                            report[id] === true;

                    }

                }
            );


        } catch (error) {

            console.log(
                "Invalid report:",
                reportKey,
                error
            );

        }

    }


    updateProgress();

}


// =====================================
// CALCULATE PROGRESS
// =====================================

function calculateProgress(
    report
) {

    let completed =
        0;


    habitIds.forEach(
        function(id) {

            if (
                report &&
                report[id] === true
            ) {

                completed++;

            }

        }
    );


    let percentage =
        0;


    if (totalHabits > 0) {

        percentage =
            Math.round(
                (
                    completed /
                    totalHabits
                ) * 100
            );

    }


    return {

        completed:
            completed,

        percentage:
            percentage

    };

}


// =====================================
// UPDATE LIVE CHECKLIST PROGRESS
// =====================================

function updateProgress() {

    const report = {};


    habitIds.forEach(
        function(id) {

            const checkbox =
                document.getElementById(id);


            if (checkbox) {

                report[id] =
                    checkbox.checked;

            } else {

                report[id] =
                    false;

            }

        }
    );


    const result =
        calculateProgress(
            report
        );


    const completedText =
        document.getElementById(
            "completedText"
        );


    const percentageText =
        document.getElementById(
            "percentageText"
        );


    const progressBar =
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
// GET USER DAILY REPORT
// =====================================

function getUserDailyReport(
    user,
    date
) {

    const key =
        getUserReportKey(
            user,
            date
        );


    if (!key) {

        return null;

    }


    const savedReport =
        localStorage.getItem(key);


    if (!savedReport) {

        return null;

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

    } catch (error) {

        console.log(
            "Invalid report:",
            key,
            error
        );

    }


    return null;

}


// =====================================
// LOAD HISTORY
// =====================================

function loadHistory() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const welcomeText =
        document.getElementById(
            "welcomeText"
        );


    if (welcomeText) {

        welcomeText.innerHTML =
            `Welcome ${user} 👋`;

    }


    const historyList =
        document.getElementById(
            "historyList"
        );


    if (!historyList) {

        return;

    }


    historyList.innerHTML =
        "";


    const reports = [];


    // =================================
    // COLLECT ONLY CURRENT USER REPORTS
    // =================================

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
            Number(parts[1]);


        const month =
            Number(parts[2]);


        const date =
            Number(parts[3]);


        if (
            !year ||
            !month ||
            !date
        ) {

            continue;

        }


        const savedReport =
            localStorage.getItem(
                key
            );


        try {

            const report =
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
    // SORT NEWEST FIRST
    // =================================

    reports.sort(
        function(a, b) {

            return b.key.localeCompare(
                a.key
            );

        }
    );


    // =================================
    // DISPLAY HISTORY
    // =================================

    reports.forEach(
        function(item) {

            const key =
                item.key;


            const report =
                item.report;


            const result =
                calculateProgress(
                    report
                );


            const parts =
                key.split("_");


            const year =
                parts[1];


            const month =
                parts[2];


            const date =
                parts[3];


            const months = [

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


            const monthName =
                months[
                    Number(month) - 1
                ];


            const displayDate =
                `${date} ${monthName} ${year}`;


            const card =
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

        }
    );


    // =================================
    // NO REPORT
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

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const weeklyDays =
        document.getElementById(
            "weeklyDays"
        );


    const weeklyAverage =
        document.getElementById(
            "weeklyAverage"
        );


    if (
        !weeklyDays ||
        !weeklyAverage
    ) {

        return;

    }


    weeklyDays.innerHTML =
        "";


    const today =
        getTodayDate();


    const todayDay =
        today.getDay();


    const currentMonday =
        new Date(today);


    const difference =
        todayDay === 0
            ? -6
            : 1 - todayDay;


    currentMonday.setDate(
        today.getDate() +
        difference
    );


    currentMonday.setHours(
        0,
        0,
        0,
        0
    );


    let weekOffset =
        0;


    const previousButton =
        document.getElementById(
            "previousWeek"
        );


    const nextButton =
        document.getElementById(
            "nextWeek"
        );


    const weekTitle =
        document.getElementById(
            "weekTitle"
        );


    function displayWeek() {

        weeklyDays.innerHTML =
            "";


        const monday =
            new Date(
                currentMonday
            );


        monday.setDate(
            currentMonday.getDate() +
            (
                weekOffset *
                7
            )
        );


        const sunday =
            new Date(
                monday
            );


        sunday.setDate(
            monday.getDate() +
            6
        );


        if (weekTitle) {

            const mondayDate =
                String(
                    monday.getDate()
                ).padStart(2, "0");


            const mondayMonth =
                String(
                    monday.getMonth() + 1
                ).padStart(2, "0");


            const mondayYear =
                monday.getFullYear();


            const sundayDate =
                String(
                    sunday.getDate()
                ).padStart(2, "0");


            const sundayMonth =
                String(
                    sunday.getMonth() + 1
                ).padStart(2, "0");


            const sundayYear =
                sunday.getFullYear();


            weekTitle.innerHTML =
                `📅 ${mondayDate}/${mondayMonth}/${mondayYear}
                - ${sundayDate}/${sundayMonth}/${sundayYear}`;

        }


        if (nextButton) {

            nextButton.disabled =
                weekOffset >= 0;

        }


        if (previousButton) {

            previousButton.disabled =
                false;

        }


        const dayNames = [

            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"

        ];


        let totalProgress =
            0;


        let trackedDays =
            0;


        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const currentDate =
                new Date(
                    monday
                );


            currentDate.setDate(
                monday.getDate() +
                i
            );


            currentDate.setHours(
                0,
                0,
                0,
                0
            );


            const isFuture =
                currentDate >
                today;


            let percentage =
                0;


            let completed =
                0;


            let hasReport =
                false;


            if (!isFuture) {

                const report =
                    getUserDailyReport(
                        user,
                        currentDate
                    );


                if (report) {

                    const result =
                        calculateProgress(
                            report
                        );


                    percentage =
                        result.percentage;


                    completed =
                        result.completed;


                    hasReport =
                        true;


                    totalProgress +=
                        percentage;


                    trackedDays++;

                }

            }


            const dayCard =
                document.createElement(
                    "div"
                );


            dayCard.className =
                "history-card";


            const year =
                currentDate.getFullYear();


            const month =
                String(
                    currentDate.getMonth() + 1
                ).padStart(2, "0");


            const date =
                String(
                    currentDate.getDate()
                ).padStart(2, "0");


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

            } else if (hasReport) {

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

            } else {

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


        let average =
            0;


        if (
            trackedDays > 0
        ) {

            average =
                Math.round(
                    totalProgress /
                    trackedDays
                );

        }


        weeklyAverage.innerHTML =
            `📊 Weekly Average : ${average}%`;

    }


    if (previousButton) {

        previousButton.onclick =
            function() {

                weekOffset--;

                displayWeek();

            };

    }


    if (nextButton) {

        nextButton.onclick =
            function() {

                if (
                    weekOffset < 0
                ) {

                    weekOffset++;

                    displayWeek();

                }

            };

    }


    displayWeek();

}


// =====================================
// MONTHLY REPORT
// =====================================

function loadMonthlyReport() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const monthSelector =
        document.getElementById(
            "monthSelector"
        );


    const monthlyCalendar =
        document.getElementById(
            "monthlyCalendar"
        );


    const monthlyAverage =
        document.getElementById(
            "monthlyAverage"
        );


    const selectedDateReport =
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


    const monthNames = [

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


    const today =
        getTodayDate();


    const currentYear =
        today.getFullYear();


    const currentMonth =
        today.getMonth() + 1;


    const currentDay =
        today.getDate();


    monthSelector.innerHTML =
        "";


    for (
        let month = 1;
        month <= 12;
        month++
    ) {

        const option =
            document.createElement(
                "option"
            );


        const monthNumber =
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


    monthSelector.value =
        `${currentYear}-${String(currentMonth).padStart(2, "0")}`;


    function showDateReport(
        year,
        month,
        day
    ) {

        const selectedDate =
            new Date(
                year,
                month - 1,
                day
            );


        const report =
            getUserDailyReport(
                user,
                selectedDate
            );


        if (!report) {

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
                        <strong>
                            0%
                        </strong>
                    </p>

                </div>

            `;

            return;

        }


        const result =
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

    }


    function displayCalendar() {

        const selectedMonth =
            monthSelector.value;


        if (!selectedMonth) {

            return;

        }


        const parts =
            selectedMonth.split("-");


        const year =
            Number(parts[0]);


        const month =
            Number(parts[1]);


        monthlyCalendar.innerHTML =
            "";


        const firstDate =
            new Date(
                year,
                month - 1,
                1
            );


        const firstDay =
            firstDate.getDay();


        const daysInMonth =
            new Date(
                year,
                month,
                0
            ).getDate();


        let totalProgress =
            0;


        let reportCount =
            0;


        // =================================
        // EMPTY CELLS
        // =================================

        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const emptyDay =
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
        // DAYS
        // =================================

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const currentDate =
                new Date(
                    year,
                    month - 1,
                    day
                );


            const report =
                getUserDailyReport(
                    user,
                    currentDate
                );


            let percentage =
                0;


            let hasReport =
                false;


            if (report) {

                const result =
                    calculateProgress(
                        report
                    );


                percentage =
                    result.percentage;


                hasReport =
                    true;


                totalProgress +=
                    percentage;


                reportCount++;

            }


            const dayCell =
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

        let average =
            0;


        if (
            reportCount > 0
        ) {

            average =
                Math.round(
                    totalProgress /
                    reportCount
                );

        }


        monthlyAverage.innerHTML =
            `📊 Monthly Average : ${average}%`;


        // =================================
        // DEFAULT DATE
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


    monthSelector.onchange =
        function() {

            displayCalendar();

        };


    displayCalendar();

}


// =====================================
// DASHBOARD
// =====================================

function loadDashboard() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    // =================================
    // WELCOME
    // =================================

    const welcomeText =
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

    const today =
        getTodayDate();


    const todayReport =
        getUserDailyReport(
            user,
            today
        );


    let todayCompleted =
        0;


    let todayPercentage =
        0;


    if (todayReport) {

        const result =
            calculateProgress(
                todayReport
            );


        todayCompleted =
            result.completed;


        todayPercentage =
            result.percentage;

    }


    // =================================
    // TODAY UI
    // =================================

    const todayCompletedText =
        document.getElementById(
            "todayCompleted"
        );


    const todayPercentageText =
        document.getElementById(
            "todayPercentage"
        );


    const todayProgressBar =
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
    // MONTHLY / WEEKLY / OVERALL
    // =================================

    let weeklyTotal =
        0;


    let weeklyTracked =
        0;


    const todayDay =
        today.getDay();


    const currentMonday =
        new Date(today);


    const difference =
        todayDay === 0
            ? -6
            : 1 - todayDay;


    currentMonday.setDate(
        today.getDate() +
        difference
    );


    // =================================
    // WEEK
    // =================================

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const currentDate =
            new Date(
                currentMonday
            );


        currentDate.setDate(
            currentMonday.getDate() +
            i
        );


        currentDate.setHours(
            0,
            0,
            0,
            0
        );


        if (
            currentDate > today
        ) {

            continue;

        }


        const report =
            getUserDailyReport(
                user,
                currentDate
            );


        if (report) {

            const result =
                calculateProgress(
                    report
                );


            weeklyTotal +=
                result.percentage;


            weeklyTracked++;

        }

    }


    let weeklyAverage =
        0;


    if (
        weeklyTracked > 0
    ) {

        weeklyAverage =
            Math.round(
                weeklyTotal /
                weeklyTracked
            );

    }


    const dashboardWeeklyAverage =
        document.getElementById(
            "dashboardWeeklyAverage"
        );


    const dashboardWeeklyBar =
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
    // MONTH
    // =================================

    let monthlyTotal =
        0;


    let monthlyTracked =
        0;


    const currentYear =
        today.getFullYear();


    const currentMonth =
        today.getMonth();


    for (
        let day = 1;
        day <= today.getDate();
        day++
    ) {

        const currentDate =
            new Date(
                currentYear,
                currentMonth,
                day
            );


        const report =
            getUserDailyReport(
                user,
                currentDate
            );


        if (report) {

            const result =
                calculateProgress(
                    report
                );


            monthlyTotal +=
                result.percentage;


            monthlyTracked++;

        }

    }


    let monthlyAverage =
        0;


    if (
        monthlyTracked > 0
    ) {

        monthlyAverage =
            Math.round(
                monthlyTotal /
                monthlyTracked
            );

    }


    const dashboardMonthlyAverage =
        document.getElementById(
            "dashboardMonthlyAverage"
        );


    const dashboardMonthlyBar =
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
    // OVERALL
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


        const parts =
            key.split("_");


        // =================================
        // DAILY REPORT ONLY
        // =================================

        if (
            parts.length !== 4
        ) {

            continue;

        }


        const savedReport =
            localStorage.getItem(
                key
            );


        try {

            const report =
                JSON.parse(
                    savedReport
                );


            const result =
                calculateProgress(
                    report
                );


            overallTotal +=
                result.percentage;


            overallTracked++;

        } catch (error) {

            console.log(
                "Invalid overall report:",
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


    const overallAverageText =
        document.getElementById(
            "overallAverage"
        );


    const overallProgressBar =
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
    // STREAK
    // =================================

    calculateDashboardStreak(
        user
    );

}


// =====================================
// DASHBOARD STREAK
// =====================================

function calculateDashboardStreak(
    user
) {

    const dates = [];


    // =================================
    // GET ONLY CURRENT USER DATES
    // =================================

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
            Number(parts[1]);


        const month =
            Number(parts[2]);


        const day =
            Number(parts[3]);


        if (
            !year ||
            !month ||
            !day
        ) {

            continue;

        }


        dates.push(
            new Date(
                year,
                month - 1,
                day
            )
        );

    }


    // =================================
    // NO REPORT
    // =================================

    if (
        dates.length === 0
    ) {

        updateStreakDisplay(
            0,
            0
        );

        return;

    }


    // =================================
    // SORT
    // =================================

    dates.sort(
        function(a, b) {

            return a - b;

        }
    );


    // =================================
    // REMOVE DUPLICATES
    // =================================

    const uniqueDates = [];


    dates.forEach(
        function(date) {

            const key =
                `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    date.getDate()
                ).padStart(2, "0")}`;


            if (
                !uniqueDates.includes(
                    key
                )
            ) {

                uniqueDates.push(
                    key
                );

            }

        }
    );


    // =================================
    // BEST STREAK
    // =================================

    let bestStreak =
        1;


    let currentBest =
        1;


    for (
        let i = 1;
        i < uniqueDates.length;
        i++
    ) {

        const previous =
            new Date(
                uniqueDates[i - 1]
            );


        const current =
            new Date(
                uniqueDates[i]
            );


        const difference =
            Math.round(
                (
                    current -
                    previous
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

            currentBest++;

        } else {

            currentBest =
                1;

        }


        if (
            currentBest >
            bestStreak
        ) {

            bestStreak =
                currentBest;

        }

    }


    // =================================
    // CURRENT STREAK
    // =================================

    const today =
        getTodayDate();


    const latestDate =
        new Date(
            uniqueDates[
                uniqueDates.length - 1
            ]
        );


    latestDate.setHours(
        0,
        0,
        0,
        0
    );


    const daysFromToday =
        Math.round(
            (
                today -
                latestDate
            ) /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    let currentStreak =
        0;


    // =================================
    // LATEST REPORT = TODAY
    // =================================

    if (
        daysFromToday === 0
    ) {

        currentStreak =
            1;


        for (
            let i =
                uniqueDates.length - 1;
            i > 0;
            i--
        ) {

            const current =
                new Date(
                    uniqueDates[i]
                );


            const previous =
                new Date(
                    uniqueDates[i - 1]
                );


            const difference =
                Math.round(
                    (
                        current -
                        previous
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

                currentStreak++;

            } else {

                break;

            }

        }

    }


    updateStreakDisplay(
        currentStreak,
        bestStreak
    );

}


// =====================================
// UPDATE STREAK DISPLAY
// =====================================

function updateStreakDisplay(
    currentStreak,
    bestStreak
) {

    const currentStreakElement =
        document.getElementById(
            "currentStreak"
        );


    const bestStreakElement =
        document.getElementById(
            "bestStreak"
        );


    if (
        currentStreakElement
    ) {

        currentStreakElement.innerHTML =
            `${currentStreak} Days`;

    }


    if (
        bestStreakElement
    ) {

        bestStreakElement.innerHTML =
            `${bestStreak} Days`;

    }

}


// =====================================
// AUTO LOAD
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        // =================================
        // CHECKLIST PAGE
        // =================================

        if (
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

            loadStreakData();

        }


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
