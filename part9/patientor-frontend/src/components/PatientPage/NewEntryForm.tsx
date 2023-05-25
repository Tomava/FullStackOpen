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
import {
  DiagnosisEntry,
  Discharge,
  EntryType,
  HealthCheckRating,
  NewEntry,
  Patient,
  SickLeave,
} from "../../types";
import { useEffect, useState } from "react";
import { toNewEntry } from "../../utils";
import patientService from "../../services/patients";

export const NewEntryForm = ({
  patientId,
  diagnoses,
}: {
  patientId: string | undefined;
  diagnoses: DiagnosisEntry[];
}) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newEntry, setNewEntry] = useState<NewEntry>();
  const [newEntryType, setNewEntryType] = useState<EntryType>();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosesCodes, setDiagnosesCodes] = useState<string[]>([]);
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
          const data: Patient = await patientService.addPatientEntry(
            patientId,
            newEntry
          );
          setNotification("Success! Added: " + data.name);
          setError("");
        } catch (error: unknown) {
          setError("Something went wrong.");
          if (error instanceof Error) {
            setError(" Error: " + error.message);
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

  const handleSetDiagnosisCode = (
    event: SelectChangeEvent<typeof diagnosesCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosesCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCreation = () => {
    try {
      switch (newEntryType) {
        case EntryType.HealthCheck:
          setNewEntry(
            toNewEntry({
              type: EntryType.HealthCheck,
              description: description,
              date: date,
              specialist: specialist,
              diagnosisCodes: diagnosesCodes,
              healthCheckRating: healthCheckRating,
            })
          );
          break;
        case EntryType.Hospital:
          const discharge: Discharge = {
            date: dischargeDate,
            criteria: dischargeCriteria,
          };
          setNewEntry(
            toNewEntry({
              type: EntryType.Hospital,
              description: description,
              date: date,
              specialist: specialist,
              diagnosisCodes: diagnosesCodes,
              discharge: discharge,
            })
          );
          break;
        case EntryType.OccupationalHealthcare:
          const sickLeave: SickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          };
          setNewEntry(
            toNewEntry({
              type: EntryType.OccupationalHealthcare,
              description: description,
              date: date,
              specialist: specialist,
              diagnosisCodes: diagnosesCodes,
              employerName: employerName,
              sickLeave: sickLeave,
            })
          );
          break;
      }
    } catch (error: unknown) {
      setError("Something went wrong.");
      if (error instanceof Error) {
        setError(" Error: " + error.message);
      }
      setNotification("");
    }
  };

  const textFieldStyle: React.CSSProperties = {
    width: "100%",
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
          InputLabelProps={{ shrink: true }}
          style={textFieldStyle}
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
          InputLabelProps={{ shrink: true }}
          style={textFieldStyle}
          id="date-input"
          label="Date"
          type="date"
          variant="standard"
          value={date}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setDate(event.target.value)}
        />
      </div>
      <div>
        <TextField
          InputLabelProps={{ shrink: true }}
          style={textFieldStyle}
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
        <FormControl variant="standard" style={textFieldStyle}>
          <InputLabel shrink id="diagnoses-codes-label">
            Diagnoses codes
          </InputLabel>
          <Select
            id="diagnosisCodes-input"
            multiple
            labelId="diagnoses-codes-label"
            variant="standard"
            value={diagnosesCodes}
            onChange={handleSetDiagnosisCode}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            <FormControl variant="standard" style={textFieldStyle}>
              <InputLabel shrink id="health-check-rating-label">
                Health Check Rating
              </InputLabel>
              <Select
                id="healthCheckRating-input"
                labelId="health-check-rating-label"
                variant="standard"
                value={healthCheckRating}
                onChange={(event: SelectChangeEvent<number>) =>
                  setHealthCheckRating(event.target.value as HealthCheckRating)
                }
              >
                {Object.keys(HealthCheckRating).map((rating) => {
                  if (!isNaN(Number(rating))) {
                    return (
                      <MenuItem key={rating} value={rating}>
                        {rating}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
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
                InputLabelProps={{ shrink: true }}
                style={textFieldStyle}
                id="dischargeDate-input"
                type="date"
                label="Date"
                variant="standard"
                placeholder=""
                value={dischargeDate}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => setDischargeDate(event.target.value)}
              />
            </div>
            <div>
              <TextField
                InputLabelProps={{ shrink: true }}
                style={textFieldStyle}
                id="dischargeCriteria-input"
                label="Criteria"
                variant="standard"
                value={dischargeCriteria}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
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
                InputLabelProps={{ shrink: true }}
                style={textFieldStyle}
                id="emloyerName-input"
                label="Employer name"
                variant="standard"
                value={employerName}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => setEmployerName(event.target.value)}
              />
            </div>
            <div>
              <TextField
                InputLabelProps={{ shrink: true }}
                style={textFieldStyle}
                id="sickLeaveStartDate-input"
                type="date"
                label="Start date"
                variant="standard"
                value={sickLeaveStartDate}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => setSickLeaveStartDate(event.target.value)}
              />
            </div>
            <div>
              <TextField
                InputLabelProps={{ shrink: true }}
                style={textFieldStyle}
                id="sickLeaveEndDate-input"
                type="date"
                label="End date"
                variant="standard"
                value={sickLeaveEndDate}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
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
        <Notification>{notificationMessage}</Notification>
      )}
      {errorMessage && <ErrorComponent>{errorMessage}</ErrorComponent>}
      {formLayout}
      <Container>
        <CancelButton
          variant="contained"
          onClick={() => setNewEntryType(undefined)}
        >
          Cancel
        </CancelButton>
        <AddButton
          variant="contained"
          onClick={handleCreation}
          disabled={disableAdd}
        >
          Add
        </AddButton>
      </Container>
    </div>
  );

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="entry-type-select-label" style={textFieldStyle}>
          Type
        </InputLabel>
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
