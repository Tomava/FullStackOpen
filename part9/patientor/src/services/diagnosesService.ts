import data from "../../data/diagnoses";
import { DiagnosisEntry } from "../types";

const getDiagnoses = (): DiagnosisEntry[] => {
  return data;
};

const getOneDiagnoses = (code: string): DiagnosisEntry => {
  const foundDiagnoses: DiagnosisEntry | undefined = data.find((diagnoses) => diagnoses.code === code);
  if (foundDiagnoses) {
    return foundDiagnoses;
  }
  throw new Error("Not found");
};

export default {
  getDiagnoses,
  getOneDiagnoses
};