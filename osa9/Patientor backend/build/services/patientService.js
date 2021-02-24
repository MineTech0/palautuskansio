"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const getEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addEntry = (entry) => {
    const newPatientEntry = Object.assign({ id: uuid_1.v4() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const getById = (id) => {
    const patient = patients_1.default.find(p => p.id === id);
    return patient;
};
const addEntryToPatient = (entry, id) => {
    const index = patients_1.default.findIndex(p => p.id === id);
    patients_1.default[index].entries.push(entry);
    return entry;
};
exports.default = {
    getEntries,
    addEntry,
    getById,
    addEntryToPatient
};
