import { newPatientEntry, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error("Incorrect parameter: " + param);
  }
  return param;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries) || !entries.every(item => typeof item === "object")) {
    throw new Error("Incorrect entries: " + entries);
  }
  return entries as Entry[];
};


const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object && "entries" in object) {
    const newEntry: newPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;