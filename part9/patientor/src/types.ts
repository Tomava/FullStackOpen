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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string,
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientEntryStripped = Omit<Patient, "ssn">;

export type newPatientEntry = Omit<Patient, "id">;
