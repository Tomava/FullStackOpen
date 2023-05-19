const calculateBmi = (height_cm: number, mass: number) : string => {
  const height_m: number = height_cm / 100
  const bmi = mass / (height_m * height_m)
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
