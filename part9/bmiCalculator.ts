const calculateBmi = (heightCm: number, mass: number) : string => {
  const heightM: number = heightCm / 100
  const bmi = mass / (heightM * heightM)
  if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi < 30) {
    return "Overweight"
  } else {
    return "Obese"
  }
};

console.log(calculateBmi(180, 74));
