import axios from "axios";

const baseUrl = "http://localhost:3003/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const newAnecdote = (newOne) =>
  axios.post(baseUrl, newOne).then((res) => res.data);

export const updateAnecdote = (update) =>
  axios.put(`${baseUrl}/${update.id}`, update).then(res => res.data)
