import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { Discharge, EntryType, NewEntry, Patient, SickLeave } from "../../types";
import { useEffect, useState } from "react";
import { toNewEntry } from "../../utils";
import patientService from "../../services/patients";

export const NewEntryForm = ({patientId}: {patientId: string | undefined}) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newEntry, setNewEntry] = useState<NewEntry>();
  const [newEntryType, setNewEntryType] = useState<EntryType>();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(1);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [disableAdd, setDisableAdd] = useState(false);

  useEffect(() => {
    const addEntry = async () => {
      if (patientId && newEntry) {
        try {
          setDisableAdd(true);
          const data: Patient = await patientService.addPatientEntry(patientId, newEntry);
          setNotification("Success! Added: " + data.name);
          setError("");
        } catch (error: unknown) {
          setError('Something went wrong.');
          if (error instanceof Error) {
            setError(' Error: ' + error.message);
          }
          setNotification("");
        } finally {
          setDisableAdd(false);
        }
      }
    };
    void addEntry();
  }, [newEntry]);

  const setNotification = (message: string) => {
    setNotificationMessage(message);
        setTimeout(() => {
          setNotificationMessage("");
        }, 5000);
  };

  const setError = (message: string) => {
    setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
  };

  const handleSetNewEntryType = (event: SelectChangeEvent<EntryType>) => {
    setNewEntryType(event.target.value as EntryType);
  };

  const handleCreation = () => {
    try {
      switch(newEntryType) {
        case(EntryType.HealthCheck):
          setNewEntry(toNewEntry({
            type: EntryType.HealthCheck,
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
            healthCheckRating: healthCheckRating,
          }));
          break;
        case(EntryType.Hospital):
          const discharge: Discharge = {
            date: dischargeDate,
            criteria: dischargeCriteria,
          };
          setNewEntry(toNewEntry({
            type: EntryType.Hospital,
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
            discharge: discharge,
          }));
          break;
        case(EntryType.OccupationalHealthcare):
          const sickLeave: SickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          };
          setNewEntry(toNewEntry({
            type: EntryType.OccupationalHealthcare,
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
            employerName: employerName,
            sickLeave: sickLeave,
          }));
          break;
        }
    } catch (error: unknown) {
      setError('Something went wrong.');
      if (error instanceof Error) {
        setError(' Error: ' + error.message);
      }
      setNotification("");
    }
  };

  const boxStyle: React.CSSProperties = {
    border: "1px solid black",
    borderStyle: "dashed",
    padding: "1em",
    marginBottom: "1em",
    marginTop: "1em",
  };

  const indentStyle: React.CSSProperties = {
    border: "1px solid black",
    borderStyle: "dashed",
    padding: "1em",
    marginBottom: "1em",
    marginTop: "1em",
  };

  const textStyle: React.CSSProperties = {
    color: "#0000008a",
    marginTop: "1em",
  };

  const Notification = styled("div")`
    color: green;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  `;

  const ErrorComponent = styled("div")`
    color: red;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  `;


  const Container = styled("div")`
    display: flex;
    justify-content: space-between;
  `;

  const CancelButton = styled(Button)`
    background-color: #ff0000;
  `;

  const AddButton = styled(Button)`
    background-color: #d3d3d3;
    color: #000000;
  `;

  let formLayout = (
    <div>
      <div>
        <TextField
          id="description-input"
          label="Description"
          variant="standard"
          value={description}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setDescription(event.target.value)}
        />
      </div>
      <div>
        <TextField
          id="date-input"
          label="Date"
          variant="standard"
          value={date}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setDate(event.target.value)}
        />
      </div>
      <div>
        <TextField
          id="specialist-input"
          label="Specialist"
          variant="standard"
          value={specialist}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setSpecialist(event.target.value)}
        />
      </div>
      <div>
        <TextField
          id="diagnosisCodes-input"
          label="Diagnoses codes"
          variant="standard"
          value={diagnosisCodes}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setDiagnosisCodes(event.target.value)}
        />
      </div>
    </div>
  );
  switch (newEntryType) {
    case EntryType.HealthCheck:
      formLayout = (
        <div>
          {formLayout}
          <div style={indentStyle}>
            <Typography style={textStyle}>Rating:</Typography>
            <TextField
              id="healthCheckRating-input"
              label="Health Check Rating"
              variant="standard"
              value={healthCheckRating}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setHealthCheckRating(Number(event.target.value))}
            />
          </div>
        </div>
      );
      break;
    case EntryType.Hospital:
      formLayout = (
        <div>
          {formLayout}
          <div style={indentStyle}>
            <Typography style={textStyle}>Discharge:</Typography>
            <div>
              <TextField
                id="dischargeDate-input"
                label="Date"
                variant="standard"
                value={dischargeDate}
                onChange={(
                  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setDischargeDate(event.target.value)}
              />
            </div>
            <div>
              <TextField
                id="dischargeCriteria-input"
                label="Criteria"
                variant="standard"
                value={dischargeCriteria}
                onChange={(
                  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setDischargeCriteria(event.target.value)}
              />
            </div>
          </div>
        </div>
      );
      break;
    case EntryType.OccupationalHealthcare:
      formLayout = (
        <div>
          {formLayout}
          <div style={indentStyle}>
            <Typography style={textStyle}>Sick leave:</Typography>
            <div>
              <TextField
                id="emloyerName-input"
                label="Employer name"
                variant="standard"
                value={employerName}
                onChange={(
                  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setEmployerName(event.target.value)}
              />
            </div>
            <div>
              <TextField
                id="sickLeaveStartDate-input"
                label="Start date"
                variant="standard"
                value={sickLeaveStartDate}
                onChange={(
                  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setSickLeaveStartDate(event.target.value)}
              />
            </div>
            <div>
              <TextField
                id="sickLeaveEndDate-input"
                label="End date"
                variant="standard"
                value={sickLeaveEndDate}
                onChange={(
                  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setSickLeaveEndDate(event.target.value)}
              />
            </div>
          </div>
        </div>
      );
      break;
  }

  formLayout = (
    <div style={boxStyle}>
      {notificationMessage && (
      <Notification>
        {notificationMessage}
      </Notification>)}
      {errorMessage && (
      <ErrorComponent>
        {errorMessage}
      </ErrorComponent>)}
      {formLayout}
      <Container>
        <CancelButton
          variant="contained"
          onClick={() => setNewEntryType(undefined)}
        >
          Cancel
        </CancelButton>
        <AddButton variant="contained" onClick={handleCreation} disabled={disableAdd}>
          Add
        </AddButton>
      </Container>
    </div>
  );

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="entry-type-select-label">Type</InputLabel>
        <Select
          labelId="entry-type-select-label"
          id="entry-type-select"
          value={newEntryType || ""}
          label="Type"
          onChange={handleSetNewEntryType}
        >
          <MenuItem value={EntryType.HealthCheck}>
            {EntryType.HealthCheck}
          </MenuItem>
          <MenuItem value={EntryType.Hospital}>{EntryType.Hospital}</MenuItem>
          <MenuItem value={EntryType.OccupationalHealthcare}>
            {EntryType.OccupationalHealthcare}
          </MenuItem>
        </Select>
      </FormControl>
      <div>{newEntryType && formLayout}</div>
    </div>
  );
};
