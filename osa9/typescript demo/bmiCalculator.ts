export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow(height/100, 2);

    if (bmi < 15) {
        return "Very severely underweight";
    }
    else if (bmi < 16) {
        return "Severely underweight";
    }
    else if (bmi < 18.5) {
        return "Underweight";
    }
    else if (bmi < 25) {
        return "Normal (healthy weight)";
    }
    else if (bmi < 30) {
        return "Overweight";
    }
    else if (bmi < 35) {
        return "Obese Class I (Moderately obese)";
    }
    else if (bmi < 40) {
        return "Obese Class II (Severely obese)	";
    }
    else {
        return "Obese Class III (Very severely obese)";
    }
};
// if(isNaN(Number(process.argv[2]))) throw new Error(`${Number(process.argv[2])} is not number!`);
// if(isNaN(Number(process.argv[3]))) throw new Error(`${Number(process.argv[3])} is not number!`);
// if (process.argv.length < 4) throw new Error("Not enough arguments");

// const height : number = Number(process.argv[2])
// const weight : number = Number(process.argv[3])
// console.log(calculateBmi(height,weight));
