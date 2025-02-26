const workTimes = {
    "Monday": [],
    "Wednesday": [
        { start: '13:00', end: '13:40' },
        { start: '13:55', end: '14:35' },
        { start: '14:50', end: '15:30' },
        { start: '15:40', end: '16:20' },
        { start: '16:25', end: '17:05' },
        { start: '17:10', end: '17:50' },
        { start: '17:55', end: '18:35' }
    ],
    "Friday": [
        { start: '13:00', end: '13:40' },
        { start: '13:55', end: '14:35' },
        { start: '14:50', end: '15:30' },
        { start: '15:40', end: '16:20' },
        { start: '16:25', end: '17:05' },
        { start: '17:10', end: '17:50' }
    ],
    "Tuesday": [
        { start: '12:10', end: '12:50' },
        { start: '13:00', end: '13:40' },
        { start: '13:55', end: '14:35' },
        { start: '14:50', end: '15:30' },
        { start: '15:40', end: '16:20' },
        { start: '16:25', end: '17:05' },
        { start: '17:10', end: '17:50' }
    ],
    "Thursday": [
        { start: '12:10', end: '12:50' },
        { start: '13:00', end: '13:40' },
        { start: '13:55', end: '14:35' },
        { start: '14:50', end: '15:30' },
        { start: '15:40', end: '16:20' },
        { start: '16:25', end: '17:05' },
        { start: '17:10', end: '17:50' }
    ]
};

const breakTimes = {
    "Monday": [],
    "Wednesday": [
        { start: '13:40', end: '13:55' },
        { start: '14:35', end: '14:50' },
        { start: '16:20', end: '16:25' },
        { start: '17:50', end: '17:55' }
    ],
    "Friday": [
        { start: '13:40', end: '13:55' },
        { start: '14:35', end: '14:50' },
        { start: '16:20', end: '16:25' },
        { start: '17:50', end: '17:55' }
    ],
    "Tuesday": [
        { start: '12:50', end: '13:00' },
        { start: '13:40', end: '13:55' },
        { start: '14:35', end: '14:50' },
        { start: '16:20', end: '16:25' },
        { start: '17:50', end: '17:55' }
    ],
    "Thursday": [
        { start: '12:50', end: '13:00' },
        { start: '13:40', end: '13:55' },
        { start: '14:35', end: '14:50' },
        { start: '16:20', end: '16:25' },
        { start: '17:50', end: '17:55' }
    ]
};

function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().getDay();
    return days[currentDay];
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function checkSchedule() {
    const day = getCurrentDay();
    const now = new Date();
    const currentTime = formatTime(now);
    let message = "";

    if (day === 'Monday') {
        message = "NOT NOW.";
    } else if (day === 'Wednesday' || day === 'Friday') {
        let found = false;
        const times = workTimes[day];

        for (const worktime of times) {
            if (currentTime >= worktime.start && currentTime <= worktime.end) {
                const endTime = new Date();
                const [endHours, endMinutes] = worktime.end.split(':');
                endTime.setHours(endHours, endMinutes);

                const timeRemaining = Math.floor((endTime - now) / 1000 / 60);
                message = `Time remaining: ${timeRemaining} minutes.`;
                found = true;
                break;
            }
        }

        if (!found) {
            const breakTimesForDay = breakTimes[day];
            for (const breaktime of breakTimesForDay) {
                if (currentTime >= breaktime.start && currentTime <= breaktime.end) {
                    message = "NO";
                    break;
                }
            }
        }
    } else if (day === 'Tuesday' || day === 'Thursday') {
        let found = false;
        const times = workTimes[day];

        for (const worktime of times) {
            if (currentTime >= worktime.start && currentTime <= worktime.end) {
                const endTime = new Date();
                const [endHours, endMinutes] = worktime.end.split(':');
                endTime.setHours(endHours, endMinutes);

                const timeRemaining = Math.floor((endTime - now) / 1000 / 60);
                message = `Time remaining: ${timeRemaining} minutes.`;
                found = true;
                break;
            }
        }

        if (!found) {
            const breakTimesForDay = breakTimes[day];
            for (const breaktime of breakTimesForDay) {
                if (currentTime >= breaktime.start && currentTime <= breaktime.end) {
                    message = "NO";
                    break;
                }
            }
        }
    }

    document.getElementById('schedule').textContent = message;
}

window.onload = checkSchedule;
