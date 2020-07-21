import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (<>
    <h1>{props.course}</h1>
  </>
  )
}
const Part = (props) => {
  return (
    <p>
    {props.part} {props.exercise}
  </p>
  ); 
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercise={props.exercises1}></Part>
      <Part part={props.part2} exercise={props.exercises2}></Part>
      <Part part={props.part3} exercise={props.exercises3}></Part>
  </div>
  )
  
}
const Total = (props) => {
  return (
  <>
    <p>Number of exercises {props.total}</p>
  </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content
      part1={course.parts[0].name}
      part2={course.parts[1].name}
      part3={course.parts[2].name}
      exercises1={course.parts[0].exercises}
      exercises2={course.parts[1].exercises}
      exercises3={course.parts[2].exercises}
      ></Content>
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))