import { useState } from 'react';

const Register = (props) => {
  const { handleRegisterSubmit } = props;

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState([]);

  // functions wooooooo
  const submitForm = (e) => {
    e.preventDefault();

    // check passwords
    if (password === password2) {
      // submit
      handleRegisterSubmit(username, password, displayName);
    } else {
      // passwords don't match
      const passwordErrorMessage = 'Passwords do not match';
      // don't add if it's already there
      if (!errors.includes(passwordErrorMessage)) {
        const newErrors = [...errors];
        newErrors.push(passwordErrorMessage);
        setErrors(newErrors);
      }
    }
  }

  return (
    <main className='singlePage'>
      <header className='hero'>
        <div className='pageTitle'>
          <h1>Register</h1>
        </div>
      </header>
      
      <div className='singlePageWrapper'>

        { props.children }
        
        <form onSubmit={submitForm} >
          <label htmlFor='username'>Email or username (private)</label>
          <input type='text'
            required
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor='password'>Password</label>
          <input type='password'
            required
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor='password2'>Re-enter your password</label>
          <input type='password'
            required
            id='password2'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <label htmlFor='displayName'>Display name (public)</label>
          <input type='text'
            required
            id='displayName'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <button type='submit'>Register</button>
          
        </form>
      </div>
    </main>
  );
};

export default Register;