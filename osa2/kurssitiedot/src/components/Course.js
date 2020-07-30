import React from 'react'

const Header = (props) => {
  return (<>
    <h1>{props.course}</h1>
  </>
  )
}
const Part = (props) => {
  return (
    <p>
    {props.name} {props.exercises}
  </p>
  ); 
}
const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
  </div>
  )
  
}
const Total = (props) => {
  return (
  <>
    <b>Total of {props.total} exercises </b>
  </>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((acc,val)=>acc+val.exercises,0)}></Total>
    </div>
  )
}
export default Course