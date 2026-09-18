import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Arto Hellas", number: "040-1231244"}
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={nameChange}/></div>
        <div>number: <input value={newNumber} onChange={numberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <div>debug: {newName} {newNumber}</div>
      <h2>Numbers</h2>
      <ul>
        {persons.map( person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App