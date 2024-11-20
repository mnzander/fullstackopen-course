import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>
          <Link to={`/blogs/${blog.id}`} state={{ blog }}>
            {blog.title} - {blog.author}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Blog;
