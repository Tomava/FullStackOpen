import { useEffect, useState } from 'react'
import axios from 'axios'

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <div>
    {personsToShow.map(person =>
      <Person key={person.name} name={person.name} number={person.number}/>
    )}
    </div>
  )
}

const Filter = ({handleFilterChange}) => {
  return (
    <form>
      <div>
        filter shown with <input
        onChange={handleFilterChange} />
      </div>
    </form>
  )
}

const PersonForm = ({addPerson, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
        onChange={handleNameChange} />
      </div>
      <div>
        number: <input
        onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(obj => obj.name.includes(filterString))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(obj => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
      
    </div>
  )

}

export default App