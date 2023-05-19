interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: string,
  target: number,
  average: number,
};

const calculateExercises = (dailyExerciseHours: number[], targetHours: number): ExerciseResult => {
  const numberOfDays: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter((hours) => hours !== 0).length;
  const averageTime: number = dailyExerciseHours.reduce((a, b) => a + b, 0) / numberOfDays;
  const success: boolean = averageTime >= targetHours;
  let rating: 1 | 2 | 3 = 1;
  const difference: number = Math.abs(averageTime - targetHours);
  if (success) {
    rating = 3;
  } else if (difference <= 0.1 * targetHours) {
    rating = 2;
  } else {
    rating = 1;
  }
  let ratingDescription: string = "";
  switch (rating) {
    case (1):
      ratingDescription = "very bad";
      break;
    case (2):
      ratingDescription = "not too bad but could be better";
      break;
    case (3):
      ratingDescription = "fantastic";
      break;
  }
  return {
    periodLength: numberOfDays,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: averageTime,
  }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
