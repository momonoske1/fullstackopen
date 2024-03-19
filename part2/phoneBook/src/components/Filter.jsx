const Filter = ({ persons, filterPerson }) => {
  return (
    <div>
      filter shown with <input value={persons} onChange={filterPerson} />
    </div>
  );
};

export default Filter;
