const Person = ({name, number, removePerson}) => {
    return (
        <p>{name} {number} <button onClick={removePerson}>delete </button></p>
    )
}

export default Person