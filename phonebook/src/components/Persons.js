import React from 'react';
import personsService from '../services/persons'

const Person = ({ person, deleteAction }) => {
    return (<div key={person.name}>{person.name} {person.number} <button onClick={deleteAction}>delete</button></div>)
}

const Persons = ({ newFilter, persons, deleteAction }) => {
  const showPersons = newFilter == "" ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
  return (showPersons.map((person, i) => <Person key={i} person={person} deleteAction={() => deleteAction(person) } />));
};

export default Persons