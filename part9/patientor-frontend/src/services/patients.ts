import axios from "axios";
import { NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getOne = async(patientId: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${patientId}`
  );
  return data;
};

const addPatientEntry = async(patientId: string, newEntry: NewEntry) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    newEntry
  );
  return data;
};

export default {
  getAll, create, getOne, addPatientEntry
};

