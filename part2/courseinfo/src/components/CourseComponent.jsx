const Courses = ({ courses }) => {
    const totalCourses = courses.length;
    return (
      <>
        {courses.map(course => (
          <Course key={course.id} course={course} />
        ))}
        <Total totalCourses={totalCourses} />
      </>
    );
};
  
const Course = ({ course }) => {
const totalExercises = course.parts.reduce((acc, part) => acc + part.exercises, 0);
return (
    <>
    <Header courseName = {course.name} />
    <Content parts = {course.parts} />
    <Total totalExercises = {totalExercises}/>
    </>
)
};

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Content = ({ parts }) => parts.map((part) => (<Part key={part.id} part={part} />));

const Part = ({ part }) => <p>{part.name}: {part.exercises}</p>;

const Total = ({ totalExercises }) => <b>total of {totalExercises} exercises</b>;

export { Courses, Course, Header, Content, Part, Total };