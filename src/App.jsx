import { useEffect, useState } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(virhe => console.error('Haku epäonnistui', virhe))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName.trim() || !newNumber.trim()) {
      alert('Both name and number must be provided!')
      return
    }

    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    if (nameExists) {
      alert(`${newName} has already been added`)
      return
    }

    const maxId = persons.length > 0 
      ? Math.max(...persons.map(p => Number(p.id) || 0)) 
      : 0

    const personObject = {
      id: String(maxId + 1),
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
      })
      .catch(virhe => console.error('Lisäys epäonnistui', virhe))
  }
  
  const nameChange = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)
  const filterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter value={filter} onChange={filterChange}/>
      </form>
      <h2>Add a number</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={nameChange}
        onNumberChange={numberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
