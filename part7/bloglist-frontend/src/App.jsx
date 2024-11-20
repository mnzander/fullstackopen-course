import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useReducer } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import notificationReducer from './reducers/notificationReducer';
import { useUser } from './contexts/UserContext';
import Users from './components/Users';
import { Link, Route, Routes } from 'react-router-dom';
import User from './components/User';
import BlogDetails from './components/BlogDetails';
import Blogs from './components/Blogs';
import styled from 'styled-components';

const App = () => {
  const { user, dispatch } = useUser();
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    message: null,
    type: null,
  });

  const queryClient = useQueryClient();

  // Mutación para actualizar los likes de un blog
  const updateLikesMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  // Mutación para eliminar un blog
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] }); // Refresca la lista de blogs
    },
  });

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      dispatch({ type: 'LOGIN', payload: loggedUser });
    } catch (exception) {
      dispatchNotification({
        type: 'SET_ERROR',
        payload: 'Wrong credentials',
      });
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' });
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <Togglable buttonLabel="login">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    </div>
  );

  const logoutSession = () => {
    dispatch({ type: 'LOGOUT' });
    window.localStorage.clear();
  };

  const Page = styled.div`
    padding: 1em;
    background: papayawhip;
  `;

  const Navigation = styled.div`
    background: BurlyWood;
    padding: 1em;
  `;

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    padding: 0.5em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `;

  return (
    <Page>
      <div>
        {notification.message && (
          <p className={notification.type === 'error' ? 'error' : 'message'}>
            {notification.message}
          </p>
        )}

        {user === null ? (
          loginForm()
        ) : (
          <div>
            <Navigation>
              <div>
                <nav>
                  <Link to="/">blogs</Link>
                  <Link to="/allUsers">users</Link>
                  <span>{user.name} logged-in </span>
                  <Button type="submit" onClick={logoutSession}>
                    logout
                  </Button>
                </nav>
              </div>
            </Navigation>
            <Routes>
              <Route path="/users/:id" element={<User />} />
              <Route path="/allUsers" element={<Users />} />
              <Route path="/" element={<Blogs />} />
              <Route
                path="/blogs/:id"
                element={
                  <BlogDetails
                    updateLikes={updateLikesMutation.mutate}
                    deleteBlog={deleteBlogMutation.mutate}
                  />
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Page>
  );
};

export default App;
