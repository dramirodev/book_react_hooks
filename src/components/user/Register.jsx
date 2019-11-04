import React, { useContext, useEffect } from 'react';
import { useInput } from 'react-hookedup';
import { useResource } from 'react-request-hook';
import { StateContext } from '../../contexts';
export default function Register() {
    const { value: userName, bindToInput: bindUserName } = useInput('');
    const { value: userPassword, bindToInput: bindUserPassword } = useInput('');
    const {
        value: userPasswordRepeat,
        bindToInput: bindUserPasswordRepeat,
    } = useInput('');

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
                {...bindUserName}
            />
            <label htmlFor="register_password">Password:</label>
            <input
                type="password"
                name="register_password"
                id="register_password"
                value={userPassword}
                {...bindUserPassword}
            />
            <label htmlFor="register_password_repeat">Password:</label>
            <input
                type="password"
                name="register_password_repeat"
                id="register_password_repeat"
                value={userPasswordRepeat}
                {...bindUserPasswordRepeat}
            />
            <input type="submit" value="Register" disabled={handleDisabled()} />
        </form>
    );
}
