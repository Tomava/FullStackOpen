const mongoose = require('mongoose')

const AddPerson = (name, phoneNumber) => {
    mongoose.connect(url)
    const person = new Person({
        name: name,
        number: phoneNumber,
    })
    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

const PrintAll = () => {
    mongoose.connect(url)
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<3) {
    console.log('Password is missing!')
    process.exit(1)
}
const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0.kmztfqk.mongodb.net/phonebook?retryWrites=true&w=majority`

if (process.argv.length === 3) {
    PrintAll()
}
else if (process.argv.length === 5) {
    const name = process.argv[3]
    const phoneNumber = process.argv[4]
    AddPerson(name, phoneNumber)
}

