import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Notification from './components/notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const setNotification = (message) => {
    setNotificationMessage(message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
  }

  const setError = (message) => {
    setErrorMessage(message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let foundPerson = persons.find(obj => obj.name === newName)
    if (foundPerson) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        personsService
          .update(foundPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
            setNotification(`Updated ${newName}`)
          })
          .catch(() => {
            setError(`Information of ${newName} has already been removed from server`)
          })
      }
      return
    }
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`Added ${newName}`)
      })
      .catch(error => {
        console.log(error.response.data)
        setError(error.response.data.error)
      })
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setNotification(`Removed ${newName}`)
      })
      .catch(() => {
        setError(`Information of ${person.name} has already been removed from server`)
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} className="notification" />
      <Notification message={errorMessage} className="error" />
      <Filter handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
      
    </div>
  )

}

export default App