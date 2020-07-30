import React from 'react'

const Persons = ({persons, filter, handle}) => {
  return (
    <div>
      {persons.filter(x => x.name.includes(filter)).map(person => 
      <p key={person.name}>{person.name} {person.number} <button value={person.id}onClick={handle}>delete</button></p>)}
    </div>
  )
}

export default Persons
