import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get("/:code", (req, res) => {
  const code: string = req.params.code;
  try {
    const foundDiagnoses = diagnosesService.getOneDiagnoses(code);
    res.send(foundDiagnoses);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;