import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <div>
          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>
    );
  };

  const handleAddBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlogAux = await blogService.create(title, author, url);

      setBlogs(prevBlogs => [...prevBlogs, newBlogAux]);
      setNewBlog(newBlogAux);
      setSuccessMessage(`a new blog ${newBlogAux.title} by ${newBlogAux.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception){
      setErrorMessage("Could not create a blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={handleAddBlog} />
        </Togglable>
      </div>
    );
  };

  const logoutSession = () => {
    setUser(null);
    window.localStorage.clear();
  };

  return (
    <div>
      <h1>blogs</h1>
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
      {successMessage ? <p className="message">{successMessage}</p> : null}

      {user === null ? loginForm()
      : <div>
          <h2>create blog</h2>
          {blogForm()}
          <br/>
          <span>{user.name} logged-in </span>
          <button type="submit" onClick={() => logoutSession()}>logout</button>
          <br/>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>
          )}
        </div>
      }
    </div>
  );
};

export default App;
