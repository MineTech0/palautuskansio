import { Gender, NewPatientEntry, NewEntry } from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    entries: []
  };

  return newEntry;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
  
    return name;
  };

  const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing birthdate: ' + date);
    }
    return date;
  };
  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
    }
  
    return occupation;
  };
  const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
    }
  
    return ssn;
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };
  const parseString = (string: any): string => {
    if (!string || !isString(string)) {
      throw new Error(`Incorrect or missing parameter`);
    }
    return string;
  };
  
const toNewEntry = (entry: any): NewEntry => {
    const newEntry = {
      description: parseString(entry.description),
      date: parseDate(entry.date),
      specialist: parseString(entry.specialist),
      diagnosisCodes: entry.diagnosisCodes || []
      
    };
    switch (entry.type) {
      case 'Hospital':
        return {
          ...newEntry,
          type: 'Hospital',
          discharge: {
            date: parseDate(entry.discharge.date),
            criteria: parseString(entry.discharge.criteria)
          }
        };
      case 'HealthCheck':
        return {
          ...newEntry,
          type: 'HealthCheck',
          healthCheckRating: entry.healthCheckRating
        };
      case 'OccupationalHealthcare':
        return {
          ...newEntry,
          type: 'OccupationalHealthcare',
          employerName: parseString(entry.employerName),
          sickLeave: {
            startDate: parseDate(entry.sickLeave.startDate),
            endDate: parseDate(entry.sickLeave.endDate)
          }
        };
      default:
        throw new Error("no type specified");
        
    }
  };

export { toNewPatientEntry, toNewEntry};