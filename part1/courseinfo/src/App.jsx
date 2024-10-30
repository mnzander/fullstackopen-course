const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;

  return (
    <>
      <Header course = { course.name } />
      <Content parts = { course.parts } />
      <Total totalExercises = { totalExercises } />
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
};

const Content = (props) => {
  return (
    <>
      <hr/>
      {/* EXERCISE 1.1
        <p>{props.parts[0]} has {props.exercises[0]} exercises</p>
        <p>{props.parts[1]} has {props.exercises[1]} exercises</p>
        <p>{props.parts[2]} has {props.exercises[2]} exercises</p> 
      */}

      {/* EXERCISE 1.2 & 1.3
      <Part part = {props.parts[0]} exercises = {props.exercises[0]} />
      <Part part = {props.parts[1]} exercises = {props.exercises[1]} />
      <Part part = {props.parts[2]} exercises = {props.exercises[2]} />
      */}

      {/* EXERCISE 1.4 & 1.5*/}
      <Part part = { props.parts[0].name } exercises = { props.parts[0].exercises } />
      <Part part = { props.parts[1].name } exercises = { props.parts[1].exercises } />
      <Part part = { props.parts[2].name } exercises = { props.parts[2].exercises } />
    </>
  )
};

/* EXERCISE 1.2 */ 
const Part = (props) => {
  return (
    <>
      <p>{props.part} has {props.exercises} exercises.</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <hr/>
      <p>The total of exercises is {props.totalExercises}</p>
    </>
  )
}

export default App