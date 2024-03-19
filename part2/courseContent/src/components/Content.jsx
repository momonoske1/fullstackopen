
const Parts = (props) => {
  return <p style={{color: 'red'}}>{props.part.name}, {props.part.exercises}</p>
}

const Content = ({ parts }) => {


  return (
    <div>
      {parts.map((part, i) => 
        <Parts key={i} part={part} />
      )}
    </div>
  );
};



export default Content;
