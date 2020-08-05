const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json()) 

morgan.token('data', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]


app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
  })
  app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
    const body = req.body
  
    if (!body.name) {
      return res.status(400).json({ 
        error: 'name missing' 
      })
    }
    else if (!body.number){
        return res.status(400).json({ 
            error: 'number missing' 
          })
    }
    else if (persons.find(person => person.name === body.name)){
        return res.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    let person = body
    person.id = Math.floor(Math.random() * (10000 - 100)) + 100;
    persons = persons.concat(person)
  
    res.json(person)
  })

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}<p/>`)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})