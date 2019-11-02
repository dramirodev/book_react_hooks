import React, { useState, useContext, useEffect } from 'react';
import { StateContext } from '../../contexts';
import { useResource } from 'react-request-hook';
export default function Register() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordRepeat, setUserPasswordRepeat] = useState('');
    const { dispatch } = useContext(StateContext);
    const [user, register] = useResource((username, password) => ({
        url: '/users',
        method: 'post',
        data: { username, password },
    }));

    useEffect(() => {
        if (user && user.data) {
            dispatch({ type: 'REGISTER', username: user.data.username });
        }
    });

    function handleUserName(evt) {
        setUserName(evt.target.value);
    }

    function handleUserPassword(evt) {
        setUserPassword(evt.target.value);
    }

    function handleUserPasswordRepeat(evt) {
        setUserPasswordRepeat(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        register(userName, userPassword);
    }

    function handleDisabled() {
        return (
            userName.length === 0 ||
            userPassword.length === 0 ||
            userPassword !== userPasswordRepeat
        );
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="register_username">Username</label>
            <input
                type="text"
                name="register_username"
                id="register_username"
                value={userName}
                onChange={handleUserName}
            />
            <label htmlFor="register_password">Password:</label>
            <input
                type="password"
                name="register_password"
                id="register_password"
                value={userPassword}
                onChange={handleUserPassword}
            />
            <label htmlFor="register_password_repeat">Password:</label>
            <input
                type="password"
                name="register_password_repeat"
                id="register_password_repeat"
                value={userPasswordRepeat}
                onChange={handleUserPasswordRepeat}
            />
            <input type="submit" value="Register" disabled={handleDisabled()} />
        </form>
    );
}
