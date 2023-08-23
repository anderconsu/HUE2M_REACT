let date = Date.now();
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

let d = new Date()
console.log(
    "Today is " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
);
