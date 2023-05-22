export interface DiagnosesEntry {
  code: string,
  name: string,
  latin?: string
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string,
  ssn: string
}

export type PatientEntryStripped = Omit<PatientEntry, "ssn">;
