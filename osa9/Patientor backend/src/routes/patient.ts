
import express from 'express';
import patientService from '../services/patientService';
import {toNewEntry, toNewPatientEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedPatientEntry = patientService.addEntry(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.post('/:id/entries', (_req, res) => {
  const patient = patientService.getById(_req.params.id);
  if (patient) {
    try {
      const newEntry = patientService.addEntryToPatient(toNewEntry(_req.body),_req.params.id);
      res.json(newEntry);
      
    } catch (e) {
      res.status(400).send(e.message);
    }
  } else {
    res.sendStatus(404);
  }

});
router.get('/:id', (_req, res) => {
  const patient = patientService.getById(_req.params.id);
  if (patient) {
    res.send({...patient, entries: patient.entries || []});
  } else {
    res.sendStatus(404);
  }

});

export default router;
