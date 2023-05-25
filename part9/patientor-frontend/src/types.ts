export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<DiagnosisEntry["code"]>
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string,
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string,
  endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string,
  entries: Entry[]
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;
