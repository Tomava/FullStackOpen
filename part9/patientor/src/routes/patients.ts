import express from "express";
import patientService from "../services/patientsService";
import { toNewPatientEntry, toNewEntry } from "../utils";
import { NewEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  try {
    const foundPatient = patientService.getPatient(id);
    res.send(foundPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const patientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(patientEntry);
    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id: string = req.params.id;
    const foundPatient = patientService.getPatient(id);
    const entry: NewEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addPatientEntry(foundPatient, entry);
    res.send(updatedPatient);
  } catch (error: unknown) { 
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;