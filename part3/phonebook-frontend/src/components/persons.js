import Person from './person'

const Persons = ({personsToShow, removePerson}) => {
  return (
    <div>
    {personsToShow.map(person =>
      <Person key={person.id} name={person.name} number={person.number} removePerson={() => removePerson(person)}/>
    )}
    </div>
  )
}

export default Persons