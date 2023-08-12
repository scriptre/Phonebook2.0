import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({filterName, handleFilterChange}) =>{
  return(
    <div>
      filter: <input value={filterName} onChange={handleFilterChange} />
    </div>
    )
}

const PersonForm =({addPersons, newName, handleNameChange, newNumber, handleNumberChange}) =>{
  return(
    <form onSubmit={addPersons}>
      <div>
        name: <input value= {newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value= {newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Persons =({name, number, handleDelete}) =>{

  return(
    <div>
      <li>
        {name} {number} {<button onClick={handleDelete}>delete</button>}
      </li>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  console.log(persons.map(person => person.name))

  useEffect(() => { //used for fetching data. json-server defaults to 3000
    console.log('effect')
    personService
      .getAll()
      .then(originPersons => {
        console.log(originPersons)
        setPersons(originPersons)
      })
  },[])


  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setFilterName(event.target.value)
  }
  const generateId = () => { //for unique id
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      //notes.map(n => n.id) creates a new array that contains all the ids of the notes. 
      //Math.max returns the maximum value of the numbers that are passed to it. 
      //However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. 
      //The array can be transformed into individual numbers by using the "three dot" spread syntax ...
      : 0
    return maxId + 1
  }


  const addPersons = (event) =>{
    event.preventDefault() //remember to prevent the default action of submitting HTML forms!
    const newObject = {
      name: newName,
      number: newNumber,
      id: generateId()
    }
    const arrNames = persons.map(person => person.name)

    if (arrNames.includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook. Would you like to replace the number?`)){
        console.log('yes')
        // const findId = arrNames.find(n => n.name === newName)
        // const updatedPerson = {
        //   ...newObject,
        //   number: newNumber,
        // }
        // console.log(updatedPerson)
        // console.log(findId)
        // personService
        //   .update(newObject.id, updatedPerson)
        //   .then(() => {
        //     setPersons(newObject.name);
        //     setNewName('');
        //     setNewNumber('');
          
        //   })
        //   .catch((error) => {
        //     console.log(
        //       "Updating the person's number failed!",
        //       error.response.data.error
        //     );
        //     setError(error.response.data.error);
        //     removeError();
        //   });
        }
      
    }else{
      personService
        .create(newObject)
        .then(newPerson =>{
          console.log(persons.concat(newPerson))
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          })
        .catch(console.log("whats happening?"))
    
    }
  } 

  const filterCopy = persons.map(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons
  console.log(filterCopy)

  const handleDelete = (id) =>{

    console.log(`${id}`)
    //setPersons(persons.filter(person => person.id !== id))
    const findPerson = persons.find(person => person.id === id)
    console.log(`${findPerson}`)
    if (window.confirm(`Delete ${findPerson.name}?`)){
      personService
        .remove(id)
        .then(ppl => {
          console.log(ppl)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
    
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm 
      addPersons={addPersons} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>
      {/* <Persons filterCopy={filterCopy} handleDelete={handleDelete} /> */}
      <div>
        {filterCopy.map(person => 

        <Persons key={person.id} //special parameter that you don't need to call
        name={person.name} 
        number={person.number} 
        handleDelete={() => handleDelete(person.id)} 
        />

        )}
        </div>
      
    </div>
  )
}

export default App
