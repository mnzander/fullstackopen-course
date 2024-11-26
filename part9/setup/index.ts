import express from "express";
import { calculateBmi, nutritionalScore } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// Endpoint /bmi
app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      res.status(400).send({ error: "Invalid or missing parameters" });
      return;
    }

    const bmi: number = calculateBmi(weight, height);
    const result: string = nutritionalScore(bmi);
    res.send({
      weight,
      height,
      result,
    });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(500).send({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    res.status(400).json({
      error: "parameters missing",
    });
  }

  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some(isNaN) ||
    isNaN(target as number)
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const result = calculateExercises(
    dailyExercises as number[],
    target as number
  );

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
