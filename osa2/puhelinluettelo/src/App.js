import React, { useState, useEffect } from 'react'

import './index.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    PersonService
      .index()
      .then(initialPersons => {
        setPersons(initialPersons)
      })


  }, [])

  const handleName = (e) => {
    setNewName(e.target.value)
  }
  const handlePhone = (e) => {
    setNewPhone(e.target.value)
  }
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }
  const handleDelete = (e) => {
    const id = parseInt(e.target.value)
    if (window.confirm("Delete " + persons.find(person => person.id === id).name + '?')) {
      PersonService
      .remove(id)
      .then(response =>{
        setNotification({
          message: `Removed ${persons.find(person => person.id === id).name}`,
          error: false
        })
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        setNotification({
          message: `Person '${persons.find(person => person.id === id).name}' was already deleted from server`,
          error: true
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newObj = {
      name: newName,
      number: newPhone
    }

    if (persons.find(person => person.name === newName)?.name === newName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        PersonService
          .update(persons.find(person => person.name === newName).id, newObj)
          .then(returnedObj => {
            setPersons(persons.filter(person => person.id !== returnedObj.id).concat(returnedObj))
            setNewName('')
            setNewPhone('')
            setNotification({
              message: `Changed ${returnedObj.name} number to ${returnedObj.number}`,
              error: false
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setNotification({
              message: `Person '${newObj.name}' was already deleted from server`,
              error: true
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    }
    else {
      PersonService
        .create(newObj)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
          setNewName('')
          setNewPhone('')
          setNotification({
            message: `Added ${returnedObj.name}`,
            error: false
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setNotification({
            message: `Person '${newObj.name}' was already deleted from server`,
            error: true
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={filter} handle={handleFilter} />
      <h2>Add new</h2>
      <PersonForm handleSubmit={handleSubmit}
        name={newName}
        phone={newPhone}
        handleName={handleName}
        handlePhone={handlePhone} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handle={handleDelete} />
    </div>
  )

}

export default App