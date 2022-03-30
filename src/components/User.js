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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // first load -> get user
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newUser = await getUser(userId);
      if (Object.keys(newUser).length > 0) {
        setUser(newUser);
      } else {
        setError(true);
      }
      setLoading(false);
    }

    fetchData();
  }, [userId]); // TODO: find a correct way to do this
  return (
    <main className='singlePage'>
      { props.children }

      { loading && !error &&
        <Loading />
      }

      { !loading && !error &&
        <></>
      }

      { !loading && !error &&
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