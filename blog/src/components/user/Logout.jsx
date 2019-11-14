import React from 'react';
import { useDispatch, useUserState } from '../../hooks';

export default function Logout() {
    const dispatch = useDispatch();
    const user = useUserState;
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
