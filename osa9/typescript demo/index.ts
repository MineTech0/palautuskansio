import { exerciseCalculator } from "./exerciseCalculator";
import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  res.json({
    height,
    weight,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line
  const activity : number[] = req.body.daily_exercises;
  // eslint-disable-next-line
  const target : number = req.body.target;
  if (!activity || !target) {
    res.json({
      error: "parameters missing",
    });
  }
  if(activity.some((v: number)=> isNaN(v)) || isNaN(target)){
    res.json({
      error: "malformatted parameters"
    });
  }
  const calculated = exerciseCalculator(activity, target);
  res.json(calculated);
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
