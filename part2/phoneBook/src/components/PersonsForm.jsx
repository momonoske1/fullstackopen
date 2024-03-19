const PersonsForm = ({
  addPerson,
  newPerson,
  newNumber,
  handleNewPerson,
  handleNewNumber,
}) => {
  return (
    <div>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handleNewPerson} />
        </div>
        <div>
          number:{" "}
          <input type="number" value={newNumber} onChange={handleNewNumber} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default PersonsForm;
