const months = [
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
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

//selectors
const deadline = document.getElementById('deadline');
const watchElements = document.querySelectorAll('.countdown-watch span');
const watchContainer = document.querySelector('.countdown-watch');

//setting dates
const date = new Date();
console.log(date);
const deadlineDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 12, 30, 0, 0);
console.log(deadlineDate);
deadline.innerHTML = `giveaway ends on ${weekdays[deadlineDate.getDay()]}, ${deadlineDate.getDate()} ${months[deadlineDate.getMonth()]}, ${deadlineDate.getFullYear()} at ${deadlineDate.getHours()}:${deadlineDate.getMinutes()} pm`;

//setting the countdown
const countDown = () => {
    const newTime = new Date().getTime();
    const targetTime = deadlineDate.getTime();

    let timeDifference = targetTime - newTime;
    const oneDay = 24 * 60 * 60 * 1000,
        onehour = 60 * 60 * 1000,
        oneMin = 60 * 1000,
        oneSec = 1000;
    let days = Math.floor(timeDifference / oneDay);
    let hours = Math.floor((timeDifference % oneDay) / onehour);
    let mins = Math.floor((timeDifference % onehour) / oneMin);
    let secs = Math.floor((timeDifference % oneMin) / oneSec);

    const dates = [days, hours, mins, secs];
    const withZero = date => {
        return date < 10 ? `0${date}` : date;
    }
    watchElements.forEach((item, index) => {
        item.textContent = withZero(dates[index]);
    })

    if (timeDifference < 0) {
        clearInterval(intervalId);
        watchContainer.style.display = "flex";
        watchContainer.style.fontSize = "1.5rem";
        watchContainer.innerHTML = `Sorry session expired`;
    }
}
const intervalId = setInterval(countDown, 1000);
countDown();