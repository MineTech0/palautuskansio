import { Gender, NewPatientEntry } from './types';

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

export default toNewPatientEntry;