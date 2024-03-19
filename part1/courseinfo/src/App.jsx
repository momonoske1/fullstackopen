const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const exercises = [10, 7, 14];

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part}, {props.exercises}
      </p>
    </div>
  );
};

const Content = () => {
  const parts = [
    "Fundamentals of React",
    "Using Props to pass data",
    "State of a component",
  ];

  return (
    <div>
      <Part part={parts[0]} exercises={exercises[0]} />
      <Part part={parts[1]} exercises={exercises[1]} />
      <Part part={parts[2]} exercises={exercises[2]} />
    </div>
  );
};

const Total = () => {
  return (
    <>
      <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  );
};

export default App;
