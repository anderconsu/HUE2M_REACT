// Create a new Date object with the current date and time
const now = new Date();

// Get the current time
const currentTime = now.toLocaleTimeString(); // Returns the time in the format like "12:34:56 PM"

// Get the current day
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = daysOfWeek[now.getDay()]; // Returns the day of the week as a string

console.log("Current time:", currentTime);
console.log("Current day:", currentDay);