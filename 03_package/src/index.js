"use strict";

const chalk = require('chalk');
const cities = require("cities");

console.log(chalk.bgRed("Hello Chalk!"));

let lat = process.argv[2];
let lng = process.argv[3];

if (lat && lng) {
    let city = cities.gps_lookup(lat, lng);
    console.log(city);
}