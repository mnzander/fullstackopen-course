import { CoursePart } from "../App";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <div>
      {courseParts.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>{part.description}</p>
              </div>
            );
          case "group":
            return (
              <div key={index}>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>Project exercises: {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={index}>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>{part.description}</p>
                <p>
                  Submit to:{" "}
                  <a href={part.backgroundMaterial}>
                    {part.backgroundMaterial}
                  </a>
                </p>
              </div>
            );
          case "special":
            return (
              <div key={index}>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>{part.description}</p>
                <p>
                  required skills: {part.requirements[0]},{" "}
                  {part.requirements[1]}
                </p>
              </div>
            );
          default:
            return assertNever(part); // Garantiza que todos los casos de `kind` sean manejados.
        }
      })}
    </div>
  );
};

export default Content;
