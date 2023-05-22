import data from "../../data/patients";
import { PatientEntryStripped, PatientEntry, newPatientEntry } from "../types";
import { v1 as uuid } from "uuid";


const getPatients = (): PatientEntryStripped[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: newPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatient: PatientEntry = { ...patient, id };
  data.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };