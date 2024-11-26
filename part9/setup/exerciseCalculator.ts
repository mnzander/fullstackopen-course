interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Week {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

const parseArguments = (args: string[]): Week => {
  if (args.length !== 9) {
    throw new Error("Please provide exactly 7 numbers for the week.");
  }

  const values = args.slice(2).map(Number);

  if (values.some(isNaN)) {
    throw new Error("All provided values must be valid numbers.");
  }

  return {
    monday: values[0],
    tuesday: values[1],
    wednesday: values[2],
    thursday: values[3],
    friday: values[4],
    saturday: values[5],
    sunday: values[6],
  };
};

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  console.log(dailyHours);
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const totalWorkoutTime = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalWorkoutTime / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average > 2) {
    rating = 3;
    ratingDescription = "Good job! Keep it up!";
  } else if (average > 1) {
    rating = 2;
    ratingDescription = "Not too bad, but could be better.";
  } else {
    rating = 1;
    ratingDescription = "Try to increase your workout intensity.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const week = parseArguments(process.argv);
  const dailyHours = Object.values(week);
  const result = calculateExercises(dailyHours, 2);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.error(errorMessage);
}
