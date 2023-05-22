export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface DiagnosesEntry {
  code: string,
  name: string,
  latin?: string
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string
}

export type PatientEntryStripped = Omit<PatientEntry, "ssn">;

export type newPatientEntry = Omit<PatientEntry, "id">;
