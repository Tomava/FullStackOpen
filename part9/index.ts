import express from "express";
import { calculateBmi } from "./bmiCalculator";
import isNumber from "./utils";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: string | undefined = req.query.height?.toString();
  const weight: string | undefined = req.query.weight?.toString();
  let message: Object = {
    error: "malformatted parameters"
  };
  if (isNumber(height) && isNumber(weight)) {
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