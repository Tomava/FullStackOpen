import patients from "../../data/patients";
import { PatientEntryStripped, Patient, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";


const getPatients = (): PatientEntryStripped[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient => {
  const foundPatient: Patient | undefined = patients.find((patient) => patient.id === id);
  if (foundPatient) {
    return foundPatient;
  }
  throw new Error("Not found");
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = { ...patient, id };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatient, addPatient };