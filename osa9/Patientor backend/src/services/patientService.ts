import { PublicPatient, NewPatientEntry, Patient, Entry, NewEntry } from './../types';
import {v4 as uuid} from 'uuid';
import patients from '../data/patients';

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry : NewPatientEntry): PublicPatient => {
    const newPatientEntry : Patient = {
        id: uuid(),
        ...entry
      };
    
      patients.push(newPatientEntry);
      return newPatientEntry;
};
const getById = (id : string) : Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntryToPatient = (entry: NewEntry, id: string): Entry => {
  const index = patients.findIndex(p=> p.id === id);
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
    
  patients[index].entries.push(newEntry);
  return newEntry;
};


export default {
  getEntries,
  addEntry,
  getById,
  addEntryToPatient
};
