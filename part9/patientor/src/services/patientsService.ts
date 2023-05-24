import data from "../../data/patients";
import { PatientEntryStripped, Patient, newPatientEntry } from "../types";
import { v1 as uuid } from "uuid";


const getPatients = (): PatientEntryStripped[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient => {
  const foundPatient: Patient | undefined = data.find((patient) => patient.id === id);
  if (foundPatient) {
    return foundPatient;
  }
  throw new Error("Not found");
};

const addPatient = (patient: newPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = { ...patient, id };
  data.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatient, addPatient };