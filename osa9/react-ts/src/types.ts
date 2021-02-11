interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }
  interface CoursePartOne extends CoursePartWithDescription {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }
  interface CoursePartWithLuckyNumber extends CoursePartWithDescription {
      name: "Finite number"
      luckyNumber: number
  }
  
  export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartWithLuckyNumber;