import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import blogService from '../services/blogs';
import getUsers from '../services/users';
import styled from 'styled-components';

const BlogDetails = ({ updateLikes, deleteBlog }) => {
  const location = useLocation();
  const { blog } = location.state;
  const id = blog.id;
  const [blogInfo, setBlogInfo] = useState({});
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(blog.likes);
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const blogDetails = async () => {
      const blogInfoAux = await blogService.getOne(id);
      setBlogInfo(blogInfoAux);
    };
    blogDetails();
  }, [id]);

  useEffect(() => {
    const getUserFromBlog = async () => {
      if (blogInfo.user) {
        const users = await getUsers();
        const userAux = users.find((user) => user.id === blogInfo.user);
        setUser(userAux.name);
      }
    };

    getUserFromBlog();
  }, [blogInfo]);

  useEffect(() => {
    const getCommentsFromBlog = async () => {
      const commentsAux = await blogService.getComments(id);
      setAllComments(commentsAux);
    };

    getCommentsFromBlog();
  }, []);

  const handleBlogLikes = async () => {
    const updatedBlog = {
      id: id,
      title: blog.title,
      author: blog.author,
      likes: likes + 1,
    };
    console.log(updatedBlog);
    await updateLikes(updatedBlog);
    setLikes(blogInfo.likes + 1);
  };

  const handleBlogRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(id);
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    await blogService.createComment(newComment, id);
    setNewComment('');
    setAllComments([...allComments, newComment]);
  };

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    padding: 0.5em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `;

  return (
    <>
      <h2>
        {blogInfo.title} - {blogInfo.author}
      </h2>
      <p>{blogInfo.url}</p>
      <span>{blogInfo.likes} likes </span>
      <Button className="like-btn" onClick={handleBlogLikes}>
        like
      </Button>
      <p>added by {user}</p>
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <div>
          add comment:
          <input
            type="text"
            value={newComment}
            placeholder="write your comment here"
            onChange={({ target }) => setNewComment(target.value)}
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
      <br />
      {allComments.map((comment) => (
        <li key={comment}>{comment}</li>
      ))}
      <br />
      <br />
      <Button onClick={handleBlogRemove}>remove</Button>
      <br />
      <br />
      <Link to="/">
        <Button>Volver</Button>
      </Link>
    </>
  );
};

export default BlogDetails;
