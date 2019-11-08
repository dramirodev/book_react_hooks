import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useInput } from 'react-hookedup';
import { useAPILogin, useDispatch } from '../../hooks';

export default function Login() {
    const [loginFailed, setLoginFailed] = useState(false);
    const { value: userName, bindToInput: bindUserName } = useInput('');
    const { value: password, bindToInput: bindPassword } = useInput('');
    const [user, login] = useAPILogin();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.data) {
            if (user.data.length > 0) {
                dispatch({ type: 'LOGIN', userName: user.data[0].username });
            } else {
                setLoginFailed(true);
            }
        }

        if (user && user.error) {
            setLoginFailed(true);
        }
    }, [dispatch, user]);

    function handleSubmit(evt) {
        evt.preventDefault();
        login(userName, password);
    }

    function handleDisabled() {
        return !userName;
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='login-username'>Username:</label>
            <input
                type='text'
                name='login-username'
                value={userName}
                id='loginusername'
                {...bindUserName}
            />
            <label htmlFor='login-password'>Password:</label>
            <input
                type='password'
                name='login-password'
                id='loginpassword'
                {...bindPassword}
            />
            <input type='submit' value='Login' disabled={handleDisabled()} />
            {loginFailed && (
                <span style={{ color: 'red' }}>
                    Invalid username or password
                </span>
            )}
        </form>
    );
}

Login.prototype = {
    setUser: PropTypes.func.isRequired,
};
