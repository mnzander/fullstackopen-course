import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import BornForm from "./BornForm";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 1000,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BornForm setError={props.setError} authors={authors} />
    </div>
  );
};

export default Authors;
