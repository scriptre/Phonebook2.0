const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json()) //activates json-parser to make accessing data easy

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "heny",
        "number": "65",
        "id": 3
      },
  ]


  const generateId = () => { //for unique id
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const newObject = {
        name: newName,
        number: newNumber,
        id: generateId()
      }
  
    notes = notes.concat(newObject)
  
    response.json(note)
  })

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>') //send method responds to http request by
    //sending hello world! Content-Type header automatically text/html
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {//This is a route. Define parameter with colon, :id
    //app.get('/api/notes/:id', ...) will handle all HTTP GET requests that are of the 
    //form /api/notes/SOMETHING, where SOMETHING is an arbitrary string.
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id) // === does not consider '1' and 1 the same
  
    if (person) {
      response.json(person) //stringify happens automatically
    } else {
      response.status(404).end()
    }
  
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })
  

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})