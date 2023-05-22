import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseResult } from "./exerciseCalculator";
import isNumber from "./utils";
import bodyParser from "body-parser";

interface ErrorMessage {
  error: string
}

interface BmiMessage {
  weight: string,
  height: string,
  bmi: string
}

const app = express();
app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: string | undefined = req.query.height?.toString();
  const weight: string | undefined = req.query.weight?.toString();
  if (height && isNumber(height) && weight && isNumber(weight)) {
    const bmi: string = calculateBmi(Number(height), Number(weight));
    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    } as BmiMessage);
  } else {
    res.status(400).send({
      error: "malformatted parameters"
    } as ErrorMessage);
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!(req.body && req.body.daily_exercises && req.body.target)) {
    res.status(400).send({
      error: "parameters missing"
    } as ErrorMessage);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (daily_exercises && target) {
    if (!isNumber(target)) {
      res.status(400).send({
        error: "malformatted parameters"
      } as ErrorMessage);
      return;
    }
    const dailyExerciseNumbers: number[] = [];
    if (!(typeof daily_exercises === "object" && Array.isArray(daily_exercises))) {
      res.status(400).send({
        error: "malformatted parameters"
      } as ErrorMessage);
      return;
    }
    for (let i = 0; i < daily_exercises.length; i++) {
      const hours: unknown = daily_exercises[i];
      if (!isNumber(hours)) {
        res.status(400).send({
          error: "malformatted parameters"
        } as ErrorMessage);
        return;
      }
      dailyExerciseNumbers.push(Number(hours));
    }
    const result: ExerciseResult = calculateExercises(dailyExerciseNumbers, Number(target));
    res.send(result);
    return;
  }
  res.status(400).send({
    error: "malformatted parameters"
  } as ErrorMessage);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});