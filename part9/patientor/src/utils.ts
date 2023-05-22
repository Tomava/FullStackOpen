import { newPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error("Incorrect parameter: " + param);
  }
  return param;
};

const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    const newEntry: newPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseString(object.gender),
      occupation: parseString(object.occupation)
    };
    return newEntry;
  }
  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;