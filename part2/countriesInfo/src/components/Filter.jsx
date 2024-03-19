const Filter = ({ handleFilter, value }) => {

  return (
    <div>
      countries filtered:{" "}
      <input value={value} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
