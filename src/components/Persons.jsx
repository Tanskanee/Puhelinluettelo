const Person = ({ person, deleteButton }) => {
  return (
    <li>{person.name} {person.number} <button onClick={deleteButton}>delete</button> </li>
  )
}

const Persons = ({ personsToShow, deletePerson }) => {
    return (
        <ul>
            {personsToShow.map( person =>
            <Person 
              key={person.id}
              person={person}
              deleteButton={() => deletePerson(person.id, person.name)}
              />
            )}
        </ul>
    )
}
export default Persons