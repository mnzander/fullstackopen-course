import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleBlogLikes = async () => {
    const updatedBlog = await blogService.update(blog.id, blog.title, blog.author, blog.url, likes + 1);
    setLikes(updatedBlog.likes);
  };

  const handleBlogRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id);
      setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id));
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title} - {blog.author}</span>
        <Togglable buttonLabel="view">
          <p>url: {blog.url}</p>
          <span>likes: {likes}</span>
          <button className="like-btn" onClick={handleBlogLikes}>like</button>
          <p>username: {blog.user === undefined ? "No username" : blog.user.name}</p>
          <button onClick={handleBlogRemove}>remove</button>
          <br/>
        </Togglable>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
};

export default Blog;