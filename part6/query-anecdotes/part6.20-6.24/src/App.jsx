import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./request";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newUpdateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (update) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const anecdoteToUpdate = anecdotes
        .map((anecdote) => (anecdote.id !== update.id ? anecdote : update))
        .sort((a, b) => b.votes - a.votes);
      queryClient.setQueryData(["anecdotes"], anecdoteToUpdate);
    },
  });

  const handleVote = (anecdote) => {
    newUpdateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'SET_NOTIFICATION', payload: `${anecdote.content} updated` }, setTimeout(() => {
      dispatch({ type: 'NULL_NOTIFICATION' })
    }, 5000))
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading...</div>;
  }

  if (result.isError) {
    return <div>anecdotes service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
