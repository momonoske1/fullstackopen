import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

/*
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (Math.random() * 100000000).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);
*/

/*
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    case "VOTED_ANECDOTE": {
      const id = action.payload.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((a, b) => b.votes - a.votes);
    }
    default:
      return state;
  }
};

export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

export const votedAnecdote = (id) => {
  return {
    type: "VOTED_ANECDOTE",
    payload: { id },
  };
};

export default reducer;
*/

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    votedAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { votedAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateVotes = (anecdote) => {
  return async dispatch => {
    const newVote = await anecdoteService.vote(anecdote)
    dispatch(votedAnecdote(newVote))
  }
}

export default anecdoteSlice.reducer;
