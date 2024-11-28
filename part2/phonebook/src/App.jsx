import personService from "./services/persons";
import Filter from './components/FilterComponent';
import PersonForm from './components/PersonFormComponent';
import Persons from './components/PersonsComponent';
import Notification from "./components/NotificationComponent";
import Footer from "./components/FooterComponent";
import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, [])

const addName = (event) => {
  event.preventDefault();

  if (newName.length < 3) {
    setErrorMessage("Name must be at least 3 characters long");
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
    return;
  }
  
  if (persons.find(person => person.name === newName && person.number === newNumber)) {
    alert(`${newName} already exists in the phonebook`);
    setNewName("");
    return;

  } else if (persons.find(person => person.name === newName && person.number !== newNumber)) {
    const person = persons.find(person => person.name === newName);
    if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return;
    handleUpdateNumber(person.id, newNumber);
    setNewName("");

  } else {
    const nameObject = { name: newName, number: newNumber, id: `${persons.length + 1}` };
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setMessage(`Person was created successfully`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
        setNewName("");
      })
      .catch(error => {
        console.log("Estoy en el error", error)
        setErrorMessage(`${newName} was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  }
};


  const handleUpdateNumber = (id, updatedNumber) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person, number: updatedNumber};

    personService
    .updatePerson(id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      setMessage(`${person.name}'s number was changed correctly`);
      setTimeout(() => {
        setMessage(null)
      }, 2000);
    })
    .catch(error => {
      console.log("Estoy en el error", error)
      setErrorMessage(`${person.name} was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      setPersons(persons.filter(n => n.id !== id))
    });
}

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value);
    const nameFilterAux = event.target.value.toLowerCase();
    const filtered = persons.filter(person => person.name.toLowerCase().includes(nameFilterAux));
    setFilteredPersons(filtered);
  };

  const handleDeletePerson = (id, name) => { 
    if(!window.confirm(`Are you sure you want to delete ${name}?`)) return; 
    personService
      .deletePerson(id)
      .then(() => {
        const personsAux = persons.filter(person => person.id !== id);
        setPersons(personsAux);
      })
      .catch(error => {
        console.log("Estoy en el error", error)
        setErrorMessage("This person was already removed from server");
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification errorMessage = {errorMessage} message = {message} />
      <Filter nameFilter = {nameFilter} handleNameFilter = {handleNameFilter} />

      <h2>Add a new name:</h2>
      <PersonForm addName = {addName} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons = {persons} filteredPersons = {filteredPersons} handleDeletePerson = {handleDeletePerson} />
      <Footer />
    </div>
  )
}

export default App