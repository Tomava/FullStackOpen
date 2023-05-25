import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import OtherGenderIcon from '@mui/icons-material/Transgender';
import { Patient } from "../../types";
import { Gender } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { EntryComponent } from "../Entry";
import { NewEntryForm } from "./NewEntryForm";

const PatientPage = () => {
  const params = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {

    const fetchPatient = async () => {
      if (params.patientId) {
        const patient = await patientService.getOne(params.patientId);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, []);

  if (patient) {
    let genderIcon = <OtherGenderIcon />;
    switch(patient.gender) {
      case(Gender.Male):
        genderIcon = <MaleIcon />;
        break;
      case(Gender.Female):
        genderIcon = <FemaleIcon />;
        break;
    }
    return (
      <div>
        <h2>{patient.name} {genderIcon}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <NewEntryForm patientId={params.patientId} />
        <h4>entries</h4>
        {patient.entries && patient.entries.map((entry) => (<EntryComponent key={entry.id} entry={entry}/>))}
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
