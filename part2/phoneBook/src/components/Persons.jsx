const Person = ({ person, deletePerson }) => {
  return (
    <div style={{ display: "flex" }}>
      <li>
        {person.name} {person.number}
      </li>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => deletePerson(person.id)}
      >
        delete
      </button>
    </div>
  );
};

const Persons = ({ persons, deletePerson }) => {
  if (persons.length === 0) {
    return (
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    );
  } else {
    return (
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    );
  }
};

export default Persons;
