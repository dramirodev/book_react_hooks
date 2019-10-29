import React from 'react';

export default function Logout({ user, setUser }) {
  function handleLogout(evt) {
    evt.preventDefault();
    setUser('');
  }
  return (
    <form onSubmit={handleLogout}>
      Logged in as: <b>{user}</b>
      <input type='submit' value='Logout' />
    </form>
  );
}
