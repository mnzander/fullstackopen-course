import { useState } from 'react';
import styled from 'styled-components';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newTitle, newAuthor, newUrl);
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    padding: 0.5em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `;

  return (
    <div>
      <h2>create blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            placeholder="write blog title here"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <br />
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            placeholder="write blog author here"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <br />
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            placeholder="write blog url here"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <br />
        <Button type="submit">create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
