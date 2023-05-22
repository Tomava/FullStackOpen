import data from "../../data/patients";
import { PatientEntryStripped } from "../types";

const getPatients = (): PatientEntryStripped[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { getPatients };