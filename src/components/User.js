import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

// components
import Time from './Time';

const User = (props) => {
  // props
  const { getUser } = props;
  // params
  const { userId } = useParams();
  // state
  const [user, setUser] = useState({});

  // first load -> get user
  useEffect(() => {
    const fetchData = async () => {
      const newUser = await getUser(userId);
      setUser(newUser);
    }

    fetchData()
      .catch(console.error);
  }, [getUser, userId])
  return (
    <main className='singlePage'>
      { Object.keys(user).length === 0 ?
        <Loading />
        :
        <>
          <header className='hero'>
            <div className='pageTitle'>
              <h1>{user.displayName}</h1>
            </div>
          </header>
          
          <div className='singlePageWrapper'>
            <dl>
              { user.username &&
                <>
                  <dt>Usename</dt>
                  <dd>{user.username}</dd>
                </>
              }
              
              
              <dt>Roles</dt>
              <dd>
                <div className='multiBadge'>
                  { user.roles.map((role) => (
                    <small key={role}
                      className={`badge badge-role badge-role-${role}`}
                    >
                      {role}
                    </small>
                  ))}
                </div>
              </dd>

              <dt>Joined</dt>
              <dd><Time time={user.createdAt} /></dd>
              
              { user.updatedAt &&
                <>
                  <dt>Profile updated</dt>
                  <dd><Time time={user.updatedAt} /></dd>
                </>
              }
            </dl>
          </div>
        </>
      }
      
    </main>
  );
};

export default User;