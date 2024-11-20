import { useLocation } from 'react-router-dom';
import BlogForm from './BlogForm';
import Blog from './Blog';
import { useMutation, useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const Blogs = () => {
  const { data: blogs, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  // Mutación para crear un blog
  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      refetch(); // Vuelve a cargar los blogs
      dispatchNotification({
        type: 'SET_SUCCESS',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' });
      }, 5000);
    },
    onError: () => {
      dispatchNotification({
        type: 'SET_ERROR',
        payload: 'Could not create a blog',
      });
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' });
      }, 5000);
    },
  });

  //Formulario de crear blogs
  const blogForm = () => (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm
          createBlog={(title, author, url) =>
            createBlogMutation.mutate({ title, author, url })
          }
        />
      </Togglable>
    </div>
  );

  const location = useLocation();
  const isUserPage = location.pathname.startsWith('/users');
  const isBlogPage = location.pathname.startsWith('/blogs');

  return (
    <>
      <h1>blogs</h1>
      {blogForm()}
      <br />
      {blogs && !isUserPage && !isBlogPage
        ? blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => <Blog key={blog.id} blog={blog} />)
        : null}
    </>
  );
};

export default Blogs;
