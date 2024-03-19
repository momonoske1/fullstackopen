import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialValue) => {
      setPersons(initialValue);
    });
  }, []);
  console.log("rendering", persons.length, "persons");

  const deletePerson = (id) => {
    const person = persons.find((n) => n.id === id);
    const confirmMsg = `delete this person -> ${person.name} from phonebook`;

    if (window.confirm(confirmMsg)) {
      personService
        .remove(id)
        .then((returnedPerson) =>
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const findPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    console.log(findPerson);
    const changedPerson = { ...findPerson, number: newNumber };
    console.log(changedPerson);

    if (findPerson) {
      if (
        window.confirm(
          `${findPerson.name} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        personService
          .update(findPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== findPerson.id ? person : returnedPerson
              )
            );
            setNewPerson("");
            setNewNumber("");
            setMessage(`updated ${findPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(`${findPerson.name} already deleted`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
            setNewPerson("");
            setNewNumber("");
          });
      } else {
        setNewPerson("");
        setNewNumber("");
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson("");
        setNewNumber("");
        setMessage(`saved ${newPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const handleNewPerson = (e) => {
    setNewPerson(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    const filterList = persons.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    setPersons(filterList);
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Notification message={message} />
        <ErrorNotification message={errorMessage} />
      </div>
      <Filter persons={filter} filterPerson={handleFilterChange} />
      <PersonsForm
        addPerson={addPerson}
        newPerson={newName}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} deletePerson={deletePerson} />
      </div>
    </div>
  );
};

export default App;
