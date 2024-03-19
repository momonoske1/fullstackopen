import Content from "./Content";

const Header = ({course}) => {
  return <h3>{course}</h3>
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, current) => sum + current.exercises, 0);
  return <p style={{textDecoration: 'underline'}}><b>Total of {total} exercises</b></p>
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts}/>
        </div>
      ))}
    </div>
  );
};

export default Course;
