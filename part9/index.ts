import express from "express";
import { calculateBmi } from "./bmiCalculator";
import isNumber from "./utils";

interface ErrorMessage {
  error: string
}

interface BmiMessage {
  weight: string,
  height: string,
  bmi: string
}

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: string | undefined = req.query.height?.toString();
  const weight: string | undefined = req.query.weight?.toString();
  let message: ErrorMessage | BmiMessage = {
    error: "malformatted parameters"
  };
  if (height && isNumber(height) && weight && isNumber(weight)) {
    const bmi: string = calculateBmi(Number(height), Number(weight));
    message = {
      weight: weight,
      height: height,
      bmi: bmi
    };
  }
  res.send(message);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});