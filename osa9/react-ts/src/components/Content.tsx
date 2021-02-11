import React from 'react'
import { CoursePart } from '../types'
import Part from './Part'

interface ContentProps {
    courseParts: CoursePart[]
}
const Content : React.FC<ContentProps> = ({courseParts}) => {
  return (
    <>
    {courseParts.map((c,i) => (
      <Part key={i} coursePart={c}/>
    ))}
    </>
  )
}

export default Content
