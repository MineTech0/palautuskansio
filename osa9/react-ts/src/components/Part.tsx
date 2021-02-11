import React from 'react'
import { CoursePart } from '../types'

interface PartProps {
    coursePart: CoursePart
}

const Part : React.FC<PartProps> = ({coursePart}) => {
  switch (coursePart.name) {
      case "Fundamentals":
          return (
              <p>{coursePart.name} {coursePart.description} {coursePart.exerciseCount}</p>
          )
      case "Using props to pass data":
          return (
              <p>{coursePart.name} {coursePart.groupProjectCount} {coursePart.exerciseCount}</p>
          )
      case "Deeper type usage":
          return (
              <p>{coursePart.name} {coursePart.description} {coursePart.exerciseSubmissionLink} {coursePart.exerciseCount} </p>
          )
      case "Finite number":
          return (
              <p>{coursePart.name} {coursePart.description} {coursePart.luckyNumber} {coursePart.exerciseCount} </p>
          )
  
      default:
          return null
  }
}

export default Part
