"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    const newEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),
        entries: []
    };
    return newEntry;
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing birthdate: ' + date);
    }
    return date;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewEntry = (entry) => {
    if (entry.hasOwnProperty('healthCheckRating')) {
        entry.type = 'HealthCheck';
    }
    else if (entry.hasOwnProperty('employerName')) {
        entry.type = 'OccupationalHealthcare';
    }
    else if (entry.hasOwnProperty('discharge')) {
        entry.type = 'Hospital';
    }
    else {
        throw new Error("Invalid type");
    }
    return entry;
};
exports.toNewEntry = toNewEntry;
;
