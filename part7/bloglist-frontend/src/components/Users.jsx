import { useEffect, useState } from 'react';
import getUsers from '../services/users';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const gettingUsers = async () => {
      const usersAux = await getUsers();
      setUsers(usersAux);
    };

    gettingUsers();
  }, []);

  const location = useLocation();
  const isUserPage = location.pathname.startsWith('/users');

  return (
    <>
      <div>
        {!isUserPage && users && users.length > 0 ? (
          <>
            <h2>Users</h2>
            {users.map((user) => (
              <div key={user.id}>
                <p>
                  <Link to={`/users/${user.id}`} state={{ user }}>
                    {user.name}
                  </Link>
                  : {user.blogs.length} blogs
                </p>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Users;
