interface calculeValues {
  value1: number;
  value2: number;
}

const parseArguments2 = (args: string[]): calculeValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (a: number, b: number): number => {
  const heightInMeters: number = b / 100;
  const squareHeight: number = heightInMeters * heightInMeters;
  return a / squareHeight;
};

export const nutritionalScore = (score: number): string => {
  if (score < 18.5) {
    return "Low (Low Weight)";
  } else if (score >= 18.5 && score < 25) {
    return "Normal (Healthy Weight)";
  } else if (score >= 25) {
    return "Overweight (Over Weight)";
  } else {
    throw new Error("Result is not a string!");
  }
};

try {
  const { value1, value2 } = parseArguments2(process.argv);
  console.log(nutritionalScore(calculateBmi(value1, value2)));
  //   console.log(nutritionalScore(calculateBmi(64, 174)));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
