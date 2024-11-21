import { useQuery } from "@apollo/client";
import { FILTERED_BOOKS } from "../queries";

const Recommendations = (props) => {
  if (!props.show) {
    return null;
  }

  const genre = props.genre.favoriteGenre;
  console.log(genre);

  const result = useQuery(FILTERED_BOOKS, {
    variables: { genre },
    pollInterval: 1000,
  });

  if (result.loading) {
    return <div>Loading filtered books...</div>;
  }

  const filteredBooks = result.data.allBooks;

  return (
    <div>
      <h3>Recommendations</h3>
      <p>books in your favorite genre: {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
