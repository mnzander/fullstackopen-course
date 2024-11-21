import { useState, useEffect } from "react";
import { EDIT_AUTHOR } from "../queries";
import { useMutation } from "@apollo/client";
import Select from "react-select";

const BornForm = ({ authors, setError }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [born, setBorn] = useState("");

  const [changeAuthor, result] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    if (!selectedAuthor) {
      setError("Please select an author");
      return;
    }

    changeAuthor({
      variables: { name: selectedAuthor.value, setBornTo: parseInt(born) },
    });

    setSelectedAuthor(null);
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Author not found");
    }
  }, [result.data]); // eslint-disable-line

  const authorOptions = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <label>Author</label>
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorOptions}
            placeholder="Select an author"
          />
        </div>
        <div>
          <label>Born year</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default BornForm;
