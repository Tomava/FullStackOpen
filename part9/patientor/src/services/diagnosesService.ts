import data from "../../data/diagnoses";
import { DiagnosesEntry } from "../types";

const getDiagnoses = (): DiagnosesEntry[] => {
  return data;
};

export default {
  getDiagnoses
};