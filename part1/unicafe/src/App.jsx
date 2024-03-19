import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h3>Statistics</h3>

      {all ? (
        <table>
          <tbody>
            <Stat text="good:" value={good} />
            <Stat text="neutral:" value={neutral} />
            <Stat text="bad:" value={bad} />
            <Stat text="all:" value={all} />
            <Stat text="average:" value={average} />
            <Stat text="positive:" value={positive} />
          </tbody>
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

const Stat = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good * 100) / total;
  return (
    <div>
      <h3>give feedback</h3>
      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
