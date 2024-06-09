import { useSelector, useDispatch } from "react-redux";
import { votedAnecdote } from "../reducers/anecdotesReducer";
import FilteredAnecdotes from "./FilteredAnecdotes";
import { setNotification } from "../reducers/notificationReducer";

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    );
  });

  const dispatch = useDispatch();

  return (
    <div>
      <FilteredAnecdotes />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(votedAnecdote(anecdote.id)),
              dispatch(setNotification(anecdote.content), 10)
            }}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdotesList;
