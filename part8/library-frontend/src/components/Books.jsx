import { useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { useState, useEffect } from "react";
import FilteredBooks from "./FilteredBooks";

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 1000,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  console.log(result.data);
  const books = result.data.allBooks;

  const { data: subscriptionData } = useSubscription(BOOK_ADDED);

  useEffect(() => {
    const allGenres = new Set();

    books.forEach((book) => {
      book.genres.forEach((genre) => allGenres.add(genre));
    });

    setGenres(Array.from(allGenres));
  }, [books]);

  useEffect(() => {
    if (subscriptionData) {
      const newBook = subscriptionData.bookAdded;
      // Muestra una alerta cuando se cree un nuevo libro
      window.alert(
        `Nuevo libro creado: ${newBook.title} por ${newBook.author.name}`
      );
    }
  }, [subscriptionData]); // Se ejecuta cada vez que llega un nuevo libro

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre, index) => (
          <button key={index} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
      </div>

      {selectedGenre && <FilteredBooks genre={selectedGenre} />}
    </div>
  );
};

export default Books;
