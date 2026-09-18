import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} has already been added`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))

    setNewName("")
    setNewNumber("")
  }
  
  const nameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter value={filter} onChange={filterChange}/>
        <div> debug: {filter}</div>
      </form>
      <h2>Add a number</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={nameChange}/></div>
        <div>number: <input value={newNumber} onChange={numberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <div>debug: {newName} {newNumber}</div>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App