import { Diagnosis } from '../types';
import diagnoseData from '../data/diagnoses.json';

const diagnoses = diagnoseData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
    return diagnoses;
  };
  
  const addEntry = (): null => {
    return null;
  };
  
  export default {
    getEntries,
    addEntry
  };