import { useState } from "react";

const Displayer = ({ anecdote, handleAnecdote, handleVotes, votes }) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleAnecdote}>next anecdote</button>
    </div>
  );
};

const MostVotedAnecdotes = ({maxVotes, bestAnecdote}) => {
  return (
    <div>
      <h2>Anecdotes with most votes</h2>
      {maxVotes ? (
        <div>
          <p>Has {maxVotes} votes</p>
          <p>{bestAnecdote}</p>
        </div>
        
      ) : (<p>no votes</p>)}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    return setSelected(random);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const mostVoted = Math.max(...points);
  const bestOne = anecdotes[points.indexOf(mostVoted)]

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    console.log(copy);
  };

  return (
    <div>
      <Displayer
        anecdote={anecdotes[selected]}
        votes={points[selected]}
        handleAnecdote={handleClick}
        handleVotes={handleVote}
      />
      <MostVotedAnecdotes maxVotes={mostVoted} bestAnecdote={bestOne}/>
    </div>
  );
};

export default App;
