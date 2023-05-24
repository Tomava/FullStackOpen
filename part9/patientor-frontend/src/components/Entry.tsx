import { DiagnosisEntry, Entry } from "../types";
import diagnosesService from "../services/diagnoses";
import { useEffect, useState } from "react";

export const EntryComponent = ({entry}: {entry: Entry}) => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>([]);
  
  const featchDiagnoses = async () => {
    if (entry.diagnosisCodes) {
      const diagnosesPromises = entry.diagnosisCodes.map((code) =>
        diagnosesService.getOne(code)
      );
      const diagnoses = await Promise.all(diagnosesPromises);
      setDiagnoses(diagnoses);
    }
  };

  useEffect(() => {
    featchDiagnoses().catch(console.error);
  }, []);
  
  return (
    <div>
      <p>{entry.date} <i>{entry.description}</i></p>
      {entry.diagnosisCodes && (
       <ul>
       {diagnoses.map((diagnosis) => (
         <li key={diagnosis.code}>
           {diagnosis.code} {diagnosis.name}
         </li>
       ))}
     </ul>
   )}
    </div>
  );
};