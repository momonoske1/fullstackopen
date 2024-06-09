import { useQueryClient, useMutation } from "@tanstack/react-query";
import { newAnecdote } from "../request";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: (newOne) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newOne));
    }
  });

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    if(content.length < 5) {
     return dispatch({ type: 'ERROR_NOTIFICATION', payload: "Anecdote too short, need at least 5 characters" }, setTimeout(() => {
       dispatch({ type: 'NULL_NOTIFICATION' })
     }, 5000))
    }
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: 'SET_NOTIFICATION', payload: `${content} created`})
    setTimeout(() => {
      dispatch({ type: 'NULL_NOTIFICATION' })
    }, 5000)
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
