import { NewPatientEntry, Gender, Entry, DiagnosisEntry, NewEntry, EntryType, HealthCheckRating, Discharge, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error("Incorrect parameter: " + param);
  }
  return param;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number && !isNaN(Number(text));
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

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object && "entries" in object) {
    const newEntry: NewPatientEntry = {
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

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> => {
  if (isString(object)) {
    object = object.split(",");
  }
  if (!Array.isArray(object) || !object.every(item => isString(item))) {
    throw new Error("Incorrect diagnosis codes: " + object);
  }
  return object as Array<DiagnosisEntry['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => Number(v)).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(Number(healthCheckRating)) || !isHealthCheckRating(Number(healthCheckRating))) {
    throw new Error("Incorrect health check rating: " + healthCheckRating);
  }
  return Number(healthCheckRating);
};

const parseDischarge = (object: unknown): Discharge => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if (!("date" in object && "criteria" in object)) {
    throw new Error('Incorrect or missing data');
  }
  const discharge: Discharge = {
    date: parseString(object.date),
    criteria: parseString(object.criteria)
  };
  return discharge;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if (!("startDate" in object && "endDate" in object)) {
    throw new Error('Incorrect or missing data');
  }
  const sickLeave: SickLeave = {
    startDate: parseString(object.startDate),
    endDate: parseString(object.endDate)
  };
  return sickLeave;
};

const toNewEntry = (entry: unknown): NewEntry => {
  if ( !entry || typeof entry !== 'object' || !("type" in entry) || !("description" in entry) || !("date" in entry) || !("specialist" in entry) || !("diagnosisCodes" in entry) ) {
    throw new Error('Incorrect or missing data');
  }
  switch (entry.type) {
    case(EntryType.HealthCheck):
      if ("healthCheckRating" in entry) {
        const newEntry: NewEntry = {
          description: parseString(entry.description),
          date: parseString(entry.date),
          specialist: parseString(entry.specialist),
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
          type: EntryType.HealthCheck,
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        };
        return newEntry;
      }
      throw new Error('Incorrect or missing data');
    case(EntryType.Hospital):
      if ("discharge" in entry) {
        const newEntry: NewEntry = {
          description: parseString(entry.description),
          date: parseString(entry.date),
          specialist: parseString(entry.specialist),
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
          type: EntryType.Hospital,
          discharge: parseDischarge(entry.discharge),
        };
        return newEntry;
      }
      throw new Error('Incorrect or missing data');
    case(EntryType.OccupationalHealthcare):
      if ("employerName" in entry) {
        const newEntry: NewEntry = {
          description: parseString(entry.description),
          date: parseString(entry.date),
          specialist: parseString(entry.specialist),
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
          type: EntryType.OccupationalHealthcare,
          employerName: parseString(entry.employerName),
        };
        if ("sickLeave" in entry) {
          newEntry.sickLeave = parseSickLeave(entry.sickLeave);
        }
        return newEntry;
      }
      throw new Error('Incorrect or missing data');
    default:
      throw new Error('Incorrect or missing data');
  }
};

export { toNewPatientEntry, toNewEntry };