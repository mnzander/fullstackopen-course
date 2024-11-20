import { Link, useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`} state={{ blog }}>
                {blog.title}
              </Link>
            </li>
          ))
        ) : (
          <p>The user does not have blogs...</p>
        )}
      </ul>
      <Link to="/">
        <button>Volver</button>
      </Link>
    </>
  );
};

export default User;
