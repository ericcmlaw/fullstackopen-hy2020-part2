import React, { useState, useEffect } from 'react'

import personsService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  const hook = () => {
    personsService.getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const deleteAction = (person) => {
    console.log(person)
    let result = window.confirm(`Delete ${person.name} ?`)

    if (result) {
      personsService
        .remove(person.id, person)
        .then(() => {
          setPersons(persons.filter(thisPerson => thisPerson.id !== person.id))
        })
    }


  }

  const addPerson = (event) => {
    event.preventDefault()
    let nameIdx = persons.findIndex(i => i.name === newName);
    console.log(persons)
    if (nameIdx === -1) {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(newPerson)
        .then(newPerson => {
          setSuccessMessage(
            `Added ${newPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

          setPersons(persons.concat(newPerson))
        })

    } else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter input={newFilter} onChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} deleteAction={deleteAction} />
    </div>
  )

}

export default App