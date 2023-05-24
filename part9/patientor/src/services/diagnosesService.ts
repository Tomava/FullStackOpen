import data from "../../data/diagnoses";
import { DiagnosisEntry } from "../types";

const getDiagnoses = (): DiagnosisEntry[] => {
  return data;
};

export default {
  getDiagnoses
};