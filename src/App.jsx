import './index.css'
import { useEffect, useState } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(virhe => {
        console.error('Haku epäonnistui', virhe)
        setNotifType('error')
        setNotifMessage('Failed to fetch numbers from server')
        setTimeout(() => setNotifMessage(null), 5000)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName.trim() || !newNumber.trim()) {
      setNotifType('error')
      setNotifMessage(`Both name and number must be provided!`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      return
    }

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      const updateNumber = window.confirm(`${newName} has already been added, replace old number with a new one?`)
      
      if (updateNumber) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(p => p.name.toLowerCase() !== newName.toLowerCase() ? p : response.data))
            setNotifType('success')
            setNotifMessage(`Updated number for ${newName}`)
            setNewName("")
            setNewNumber("")
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
          })
          .catch(virhe => {
            console.error('Päivitys epäonnistui', virhe)
            setNotifType('error')
            setNotifMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotifType('success')
        setNotifMessage(`Added ${newName}`)
        setNewName("")
        setNewNumber("")
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
      .catch(virhe => {
        console.error('Lisäys epäonnistui', virhe)
        setNotifType('error')
        setNotifMessage(`An error occurred adding the person`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotifType('success')
          setNotifMessage(`Deleted ${name}`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
        .catch(virhe => {
          console.error('Poisto epäonnistui', virhe)
          setNotifType('error')
          setNotifMessage(`The person '${name}' was already deleted from server`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <Notification message={notifMessage} type={notifType}/>
      <Filter value={filter} onChange={filterChange}/>
      
      <h2>Add a number</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={nameChange}
        onNumberChange={numberChange}
        onSubmit={addPerson}
      />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
