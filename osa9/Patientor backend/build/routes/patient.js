"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getEntries());
});
router.post('/', (_req, res) => {
    try {
        const newPatientEntry = utils_1.toNewPatientEntry(_req.body);
        const addedPatientEntry = patientService_1.default.addEntry(newPatientEntry);
        res.json(addedPatientEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (_req, res) => {
    const patient = patientService_1.default.getById(_req.params.id);
    if (patient) {
        try {
            const newEntry = utils_1.toNewEntry(_req.body);
            patientService_1.default.addEntryToPatient(newEntry, _req.params.id);
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    }
    else {
        res.sendStatus(404);
    }
});
router.get('/:id', (_req, res) => {
    const patient = patientService_1.default.getById(_req.params.id);
    if (patient) {
        res.send(Object.assign(Object.assign({}, patient), { entries: patient.entries || [] }));
    }
    else {
        res.sendStatus(404);
    }
});
exports.default = router;
