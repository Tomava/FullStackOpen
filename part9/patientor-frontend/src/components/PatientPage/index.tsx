import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import OtherGenderIcon from "@mui/icons-material/Transgender";
import { DiagnosisEntry, Patient } from "../../types";
import { Gender } from "../../types";
import { useEffect, useState } from "react";
import { EntryComponent } from "./EntryComponent";
import { NewEntryForm } from "./NewEntryForm";

const PatientPage = ({
  patients,
  diagnoses,
}: {
  patients: Patient[]
  diagnoses: DiagnosisEntry[];
}) => {
  const params = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    if (params.patientId) {
      const patient = patients.find((patient) => patient.id === params.patientId);
      setPatient(patient);
    }
  }, [patients]);

  if (patient) {
    let genderIcon = <OtherGenderIcon />;
    switch (patient.gender) {
      case Gender.Male:
        genderIcon = <MaleIcon />;
        break;
      case Gender.Female:
        genderIcon = <FemaleIcon />;
        break;
    }
    return (
      <div>
        <h2>
          {patient.name} {genderIcon}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <NewEntryForm patientId={params.patientId} diagnoses={diagnoses} />
        <h4>entries</h4>
        {patient.entries &&
          patient.entries.map((entry) => (
            <EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
      </div>
    );
  }
  return (
    <div>
      <p>Not found</p>
    </div>
  );
};

export default PatientPage;
