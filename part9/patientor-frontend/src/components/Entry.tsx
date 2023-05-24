import { Entry } from "../types";

export const EntryComponent = ({entry}: {entry: Entry}) => {
  let diagnosisCodesElement;
  if (entry.diagnosisCodes) {
    const diagnosisCodes = entry.diagnosisCodes.map((code) => (
      <li key={code}>{code}</li>
    ));
    diagnosisCodesElement = <ul>{diagnosisCodes}</ul>;
  }
  return (
    <div>
      <p>{entry.date} <i>{entry.description}</i></p>
      {entry.diagnosisCodes && diagnosisCodesElement}
    </div>
  );
};