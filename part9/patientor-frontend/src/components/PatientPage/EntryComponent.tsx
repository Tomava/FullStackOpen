import { DiagnosisEntry, Entry, EntryType } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import WorkIcon from '@mui/icons-material/Work';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case(EntryType.HealthCheck):
      return <LocalHospitalIcon />;
    case(EntryType.Hospital):
      return <HealingIcon />;
    case(EntryType.OccupationalHealthcare):
      return <WorkIcon />;
    default:
      return assertNever(entry);
  }
};

export const EntryComponent = ({entry, diagnoses}: {entry: Entry, diagnoses: DiagnosisEntry[]}) => {

  const boxStyle: React.CSSProperties  = {
    border: '1px solid black',
    padding: "1em",
    marginBottom: "1em"
  };

  return (
    <div style={boxStyle}>
      <p>{entry.date} <EntryDetails entry={entry} /><br /><i>{entry.description}</i></p>
      {entry.diagnosisCodes && (
       <ul>
       {entry.diagnosisCodes?.map((diagnosisCode) => {
        const diagnosis = diagnoses.find((diagnosisSearch) => diagnosisSearch.code === diagnosisCode);
        if (diagnosis) {
          return (
            <li key={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </li>
          );
        }
       })}
       </ul>
      )}
     <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};