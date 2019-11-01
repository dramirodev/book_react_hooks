import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { StateContext } from '../../contexts';

export default function Login() {
    const [userName, setUserName] = useState('');
    const { dispatch } = useContext(StateContext);

    function handleUserName(evt) {
        setUserName(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        dispatch({ type: 'LOGIN', userName });
    }

    function handleDisabled() {
        return !userName;
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="login-username">Username:</label>
            <input
                type="text"
                name="login-username"
                value={userName}
                id="loginusername"
                onChange={handleUserName}
            />
            <label htmlFor="login-password">Password:</label>
            <input type="password" name="login-password" id="loginpassword" />
            <input type="submit" value="Login" disabled={handleDisabled()} />
        </form>
    );
}

Login.prototype = {
    setUser: PropTypes.func.isRequired,
};
