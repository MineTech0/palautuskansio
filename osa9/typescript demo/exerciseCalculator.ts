interface exerciseCalculatorI {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export const exerciseCalculator = (
  activity: Array<number>,
  target: number
): exerciseCalculatorI => {
  const sum: number = activity.reduce((s, a) => s + a, 0);
  const retObj: exerciseCalculatorI = {
    periodLength: activity.length,
    trainingDays: activity.reduce((s, a) => (a !== 0 ? s + 1 : s), 0),
    success: activity.every((v) => v >= target),
    target,
    average: sum / activity.length,
    rating: 3,
    ratingDescription: "excellent",
  };

  if (sum <= 1 * retObj.periodLength) {
    retObj.rating = 1;
    retObj.ratingDescription = "this is bad";
  } else if (sum <= 2 * retObj.periodLength) {
    retObj.rating = 2;
    retObj.ratingDescription = "fine";
  }
  return retObj;
};
// if (process.argv.length < 4) throw new Error("Not enough arguments");

// const target = Number(process.argv[2]);
// if (isNaN(target)) throw new Error("Provided target is not number!");

// const activity: number[] = process.argv
//   .filter((_v, i) => {
//     if (i > 2) {
//       return true;
//     } else return false;
//   })
//   .map((v) => {
//     const n = Number(v);
//     if (isNaN(n)) throw new Error(`${v} is not number!`);
//     return n;
//   });

// console.log(exerciseCalculator(activity, target));
