require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token('content', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  // Return a space to not have "-" at the end
  return ' '
})
const basePath = '/api/persons'

app.get(basePath, (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`Phonebook has info for ${persons.length} people<br>
        ${new Date()}`)
  })
})

app.get(`${basePath}/:id`, (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete(`${basePath}/:id`, (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.post(basePath, (request, response, next) => {
  const body = request.body


  if (!(body.name && body.number)) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  Person.findOne({ name: body.name }).then(person => {
    if (person) {
      return response.status(400).json({ error: 'name must be unique' })
    }
  })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))

})

app.put(`${basePath}/:id`, (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person,     { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      next(error)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invalid id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)