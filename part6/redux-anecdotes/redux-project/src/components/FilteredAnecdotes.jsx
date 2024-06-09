import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const FilteredAnecdotes = () => {
  const dispatch = useDispatch();

  return (
    <form>
      <input
        type="text"
        name="filter"
        onChange={(e) => dispatch(filterChange(e.target.value))}
      />
    </form>
  );
};

export default FilteredAnecdotes;
