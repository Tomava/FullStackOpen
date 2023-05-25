import axios from "axios";
import { DiagnosisEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getOne = async(code: string) => {
  const { data } = await axios.get<DiagnosisEntry>(
    `${apiBaseUrl}/diagnoses/${code}`
  );
  return data;
};

const getAll = async() => {
  const { data } = await axios.get<DiagnosisEntry[]>(
    `${apiBaseUrl}/diagnoses`
  );
  return data;
};

export default {
  getOne, getAll
};

