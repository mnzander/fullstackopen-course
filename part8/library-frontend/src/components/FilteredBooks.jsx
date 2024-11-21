import { useQuery } from "@apollo/client";
import { FILTERED_BOOKS } from "../queries";

const FilteredBooks = ({ genre }) => {
  const result = useQuery(FILTERED_BOOKS, {
    variables: { genre },
    pollInterval: 1000,
  });

  if (result.loading) {
    return <div>Loading filtered books...</div>;
  }
  console.log(result.data);
  const filteredBooks = result.data.allBooks;

  return (
    <div>
      <h3>Books in genre: {genre}</h3>
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

export default FilteredBooks;
