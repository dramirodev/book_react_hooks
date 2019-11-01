import React from 'react';

export default function Logout({ user, dispatch }) {
    function handleLogout(evt) {
        evt.preventDefault();
        dispatch({ type: 'LOGOUT' });
    }
    return (
        <form onSubmit={handleLogout}>
            Logged in as: <b>{user}</b>
            <input type="submit" value="Logout" />
        </form>
    );
}
