import React, {useState} from 'react';
import PropTypes from 'prop-types';

export default function Login({setUser}) {
  const [userName, setUserName] = useState('');

  function handleUserName(evt) {
    setUserName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setUser(userName);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='login-username'>Username:</label>
      <input
        type='text'
        name='login-username'
        id='loginusername'
        onChange={handleUserName}
      />
      <label htmlFor='login-password'>Password:</label>
      <input type='password' name='login-password' id='loginpassword'/>
      <input type='submit' value='Login' disabled={userName.length === 0}/>
    </form>
  );
}

Login.prototype = {
  setUser: PropTypes.func.isRequired,
};
