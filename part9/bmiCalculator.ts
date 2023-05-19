import isNumber from "./utils";

interface ArgumentValues {
  heightCm: number;
  mass: number;
}

export const calculateBmi = (heightCm: number, mass: number) : string => {
  const heightM: number = heightCm / 100;
  const bmi = mass / (heightM * heightM);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

const parseArguments = (args: string[]): ArgumentValues => {
  if (args.length != 4) {
    throw new Error("Wrong amount of arguments");
  }
  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      heightCm: Number(process.argv[2]),
      mass: Number(process.argv[3])
    };
  }
  throw new Error("Wrong type of arguments");
};

try {
  const { heightCm, mass } = parseArguments(process.argv);
  console.log(calculateBmi(heightCm, mass));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

